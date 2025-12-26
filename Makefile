.PHONY: dev build clean serve draft new help modules

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
	@echo ""

# Development server with drafts, future posts, and fast render
dev:
	hugo server --buildDrafts --buildFuture --disableFastRender --navigateToChanged

# Production-like local server
serve:
	hugo server --minify

# Build for production
build:
	hugo --minify --gc

# Show only drafts
draft:
	hugo server --buildDrafts --buildFuture

# Clean generated files and caches
clean:
	rm -rf public/
	rm -rf resources/_gen/
	rm -rf .hugo_build.lock
	@echo "Cleaned: public/, resources/_gen/, .hugo_build.lock"

# Update Hugo modules
modules:
	hugo mod get -u ./...
	hugo mod tidy
	@echo "Hugo modules updated"

# Create new post
# Usage: make new POST=my-post-title
new:
ifndef POST
	@echo "Usage: make new POST=my-post-title"
	@exit 1
endif
	hugo new content/post/$(POST).md
	@echo "Created: content/post/$(POST).md"
