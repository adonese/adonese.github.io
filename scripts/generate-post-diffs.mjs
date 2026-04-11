#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const outputPath = path.join(process.cwd(), "data", "generated", "post_diffs.json");
const requestedRef = process.env.POST_DIFF_REF || "origin/master";

function runGit(args, allowFailure = false) {
  try {
    return execFileSync("git", args, {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trimEnd();
  } catch (error) {
    if (allowFailure) {
      return null;
    }
    throw error;
  }
}

function writeOutput(payload) {
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
}

function log(message) {
  console.error(`[post-diffs] ${message}`);
}

function resolveRef() {
  if (runGit(["rev-parse", "--verify", requestedRef], true)) {
    return requestedRef;
  }

  if (runGit(["rev-parse", "--verify", "HEAD"], true)) {
    log(`ref "${requestedRef}" not found, falling back to HEAD`);
    return "HEAD";
  }

  return null;
}

function listPostFiles(ref) {
  const output = runGit(["ls-tree", "-r", "--name-only", ref, "--", "content/post"], true) || "";
  return output
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((filePath) => filePath.endsWith(".md"));
}

function readFileAtRevision(revision, filePath) {
  return runGit(["show", `${revision}:${filePath}`], true);
}

function parseDraftFlag(fileContent) {
  const frontMatterMatch = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!frontMatterMatch) {
    return null;
  }

  const draftMatch = frontMatterMatch[1].match(/(?:^|\r?\n)\s*draft\s*:\s*([^\r\n#]+)/i);
  if (!draftMatch) {
    return null;
  }

  const value = draftMatch[1].trim().replace(/^['"]|['"]$/g, "").toLowerCase();
  if (value === "false") {
    return false;
  }
  if (value === "true") {
    return true;
  }

  return null;
}

function listCommitHistory(ref, filePath) {
  const output = runGit(["log", "--follow", "--format=%H", ref, "--", filePath], true) || "";
  return output.split(/\r?\n/).filter(Boolean);
}

function readCommitMeta(commit) {
  const output = runGit(["show", "-s", "--format=%H%n%h%n%cs%n%s", commit], false);
  const [fullHash, shortHash, commitDate, ...subjectParts] = output.split(/\r?\n/);

  return {
    fullHash,
    shortHash,
    commitDate,
    subject: subjectParts.join("\n"),
  };
}

function findLatestPublishedRevisions(ref, filePath) {
  const published = [];

  for (const commit of listCommitHistory(ref, filePath)) {
    const content = readFileAtRevision(commit, filePath);
    if (!content) {
      continue;
    }

    if (parseDraftFlag(content) === false) {
      published.push({ commit, content });
    }

    if (published.length === 2) {
      break;
    }
  }

  return published;
}

function buildDiff(previousCommit, currentCommit, filePath) {
  return (
    runGit(
      ["diff", "--no-color", "--unified=3", previousCommit, currentCommit, "--", filePath],
      true,
    ) || ""
  );
}

function toContentKey(filePath) {
  return filePath.replace(/^content\//, "");
}

function main() {
  const ref = resolveRef();
  if (!ref) {
    log("no git revision available, writing empty diff data");
    writeOutput({});
    return;
  }

  const result = {};

  for (const filePath of listPostFiles(ref)) {
    const currentContent = readFileAtRevision(ref, filePath);
    if (!currentContent || parseDraftFlag(currentContent) !== false) {
      continue;
    }

    const [currentPublishedRevision, previousPublishedRevision] = findLatestPublishedRevisions(ref, filePath);
    if (!currentPublishedRevision || !previousPublishedRevision) {
      continue;
    }

    const diff = buildDiff(previousPublishedRevision.commit, currentPublishedRevision.commit, filePath);
    if (!diff.trim()) {
      continue;
    }

    const currentMeta = readCommitMeta(currentPublishedRevision.commit);
    const previousMeta = readCommitMeta(previousPublishedRevision.commit);

    result[toContentKey(filePath)] = {
      path: filePath,
      currentCommit: currentMeta.fullHash,
      currentShortCommit: currentMeta.shortHash,
      currentDate: currentMeta.commitDate,
      currentSubject: currentMeta.subject,
      previousCommit: previousMeta.fullHash,
      previousShortCommit: previousMeta.shortHash,
      previousDate: previousMeta.commitDate,
      previousSubject: previousMeta.subject,
      diff,
    };
  }

  writeOutput(result);

  const affectedPaths = Object.keys(result).sort();
  const count = affectedPaths.length;
  log(`wrote ${count} post diff ${count === 1 ? "entry" : "entries"} from ${ref}`);

  for (const articlePath of affectedPaths) {
    log(`affected: ${articlePath}`);
  }
}

main();
