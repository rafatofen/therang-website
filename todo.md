# Admin Dashboard Todo

## Phase 1: Upgrade & Schema
- [x] Upgrade project to web-db-user (backend + database)
- [x] Design database schema
- [x] Create migration script
- [x] Seed default admin account and initial content

## Phase 2: Backend API
- [x] Auth endpoints (login, me, password change)
- [x] Content CRUD endpoints
- [x] Testimonials CRUD endpoints
- [x] Partners CRUD endpoints
- [x] SEO settings endpoints
- [x] Links manager endpoints
- [x] Public read endpoints
- [x] JWT middleware

## Phase 3: Admin Dashboard UI
- [x] Login page
- [x] Dashboard layout with sidebar
- [x] Content editors per section
- [x] Testimonials manager
- [x] Partners manager
- [x] SEO settings editor
- [x] Links manager
- [x] Password change form

## Phase 4: Connect Frontend
- [x] Create content hook/context
- [x] Update pages to use dynamic content
- [x] Fallback to hardcoded content

## Phase 5: Test & Polish
- [x] Write vitest tests (20 tests passing)
- [x] Visual verification of public site
- [x] Visual verification of admin dashboard
- [x] Save checkpoint

## Content Editor Fix & Image Upload
- [x] Diagnose why content editor changes don't reflect on the website
- [x] Add content sections for ALL pages (Space, Partners, Location, Tour, Booking) not just Home
- [x] Make all public pages read content dynamically from the database
- [x] Add image upload endpoint to backend (using S3 storagePut)
- [x] Add image upload UI component to admin dashboard
- [x] Add image upload to Content Editor sections
- [x] Add image upload to Partners manager
- [x] Add video upload support
- [x] Test content editing end-to-end
- [x] Test image upload end-to-end

## Bug Fixes
- [x] Fix UNSAVED badge persisting after successful save in Content Editor
- [x] Clear editValues state after save to prevent stale data

## Final Fixes
- [x] Fix hero video not changeable in content editor
- [x] Add all Space page images as editable content sections in admin (36 images across 6 sections)
