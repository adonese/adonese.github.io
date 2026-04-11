.PHONY: dev build clean serve draft new help modules post-diffs

POST_DIFF_REF ?= origin/master
LOCAL_BASE_URL ?= http://localhost:1313/

# Default target
help:
	@echo "Hugo Blog Development Commands"
	@echo "=============================="
	@echo ""
	@echo "  make dev       - Start development server with drafts and live reload"
	@echo "  make serve     - Start production-like server (no drafts)"
	@echo "  make build     - Build site for production"
	@echo "  make draft     - Start server showing only drafts"
	@echo "  make clean     - Remove generated files and caches"
	@echo "  make modules   - Update Hugo modules to latest versions"
	@echo "  make new       - Create new post (usage: make new POST=my-post-title)"
	@echo "  make post-diffs - Generate git diff data for published posts"
	@echo ""
	@echo "Variables:"
	@echo "  LOCAL_BASE_URL - Base URL for local hugo server targets (default: http://localhost:1313/)"
	@echo ""

# Development server with drafts, future posts, and fast render
dev:
	@POST_DIFF_REF=$(POST_DIFF_REF) node scripts/generate-post-diffs.mjs
	hugo server --baseURL $(LOCAL_BASE_URL) --buildDrafts --buildFuture --disableFastRender --navigateToChanged

# Production-like local server
serve:
	@POST_DIFF_REF=$(POST_DIFF_REF) node scripts/generate-post-diffs.mjs
	hugo server --baseURL $(LOCAL_BASE_URL) --minify

# Build for production
build:
	@POST_DIFF_REF=$(POST_DIFF_REF) node scripts/generate-post-diffs.mjs
	hugo --minify --gc

# Show only drafts
draft:
	@POST_DIFF_REF=$(POST_DIFF_REF) node scripts/generate-post-diffs.mjs
	hugo server --baseURL $(LOCAL_BASE_URL) --buildDrafts --buildFuture

# Clean generated files and caches
clean:
	rm -rf public/
	rm -rf resources/_gen/
	rm -rf data/generated/
	rm -rf .hugo_build.lock
	@echo "Cleaned: public/, resources/_gen/, data/generated/, .hugo_build.lock"

# Update Hugo modules
modules:
	hugo mod get -u ./...
	hugo mod tidy
	@echo "Hugo modules updated"

# Generate git diff data for published posts
post-diffs:
	@POST_DIFF_REF=$(POST_DIFF_REF) node scripts/generate-post-diffs.mjs

# Create new post
# Usage: make new POST=my-post-title
new:
ifndef POST
	@echo "Usage: make new POST=my-post-title"
	@exit 1
endif
	hugo new content/post/$(POST).md
	@echo "Created: content/post/$(POST).md"
