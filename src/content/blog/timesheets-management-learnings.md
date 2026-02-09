---
title: "Timesheets Management System: Lessons from Building an Internal Tool"
description: "Exploring the challenges and learnings from developing a comprehensive timesheet management system during my internship at Jairosoft. Insights into database design, UX for enterprise apps, and rapid prototyping."
date: 2024-09-10
author: "Kristee Joy Dutaro"
tags: ["web-development", "database-design", "enterprise-software", "internship", "lessons-learned"]
published: false
---

During my internship at Jairosoft, I had the opportunity to build an internal timesheet management system from scratch. While it never made it to production as a commercial product, the experience was invaluable and taught me lessons that have shaped how I approach software development since then.

## The Problem

Jairosoft is a software development company with multiple teams working on different projects simultaneously. The company needed a way to track employee working hours across projects, calculate billable time, and generate invoices for clients. Without a proper system, this was done manually using spreadsheets, which was error-prone and time-consuming.

## The Solution

I was tasked with building a timesheet management system MVP that would streamline this process. The system needed to:

1. Allow employees to log their daily working hours per project
2. Track project assignments and allocations
3. Calculate billable time based on project rates
4. Generate reports for project managers and accounting
5. Support different user roles (Employee, Manager, Admin)

## Architecture & Design Decisions

### Database Schema

The most critical part of any timesheet system is the database design. I had to consider:

- **Normalization:** Avoiding data duplication while maintaining query performance
- **Temporal Data:** Handling date-based queries efficiently
- **Relationships:** Proper foreign keys between employees, projects, timesheets, and billing records
- **Audit Trail:** Maintaining a history of changes for compliance

Key tables included:
- `employees` - User information and roles
- `projects` - Project details and billing rates
- `timesheets` - Daily time entries
- `project_assignments` - Employee-project mappings
- `billing_records` - Generated invoices and billable hours

### User Experience Design

One of the biggest challenges was creating an interface that was intuitive for both employees entering time and managers reviewing it. I learned that:

- **Simplicity is crucial:** Timesheets are a necessary task, not an enjoyable one. The interface had to be as frictionless as possible.
- **Validation matters:** Preventing invalid entries (negative hours, future dates, etc.) upfront saves headaches later.
- **Visibility:** Managers needed to see their team's time at a glance, while employees needed detailed views of their own hours.

### Handling Edge Cases

Real-world timesheet management has many edge cases:

- **Overtime:** How to handle hours beyond the standard 8-hour day
- **Fractional hours:** Should we allow 30 minutes increments or round to nearest hour?
- **Multiple projects in one day:** How to split time between projects fairly
- **Corrections and adjustments:** How to handle corrections without data loss
- **Time off (vacation, sick leave):** How to differentiate paid leave from billable hours

Each of these required thoughtful implementation.

## Key Technical Learnings

### Database Optimization

- **Indexes:** Identifying which columns to index for common queries
- **Query optimization:** Using EXPLAIN to analyze slow queries
- **Aggregation:** Efficiently calculating totals and summaries across months
- **Partitioning:** How to handle growing datasets as the company scales

### Business Logic Implementation

- **Validation:** Complex rules for what constitutes valid time entry
- **Calculations:** Accurate billing calculations accounting for project rates and overtime
- **Reporting:** Aggregating data at different granularities (daily, weekly, monthly, per-project)

### User Role Management

Different roles needed different permissions and views:
- **Employees:** Can only see and edit their own timesheets
- **Managers:** Can see and approve their team's timesheets
- **Admins:** Full system access for configuration and reporting

Implementing this correctly required careful consideration of permission checks at both the UI and API levels.

## Challenges & Solutions

### Challenge 1: Time Zone Handling

Employees in different locations meant we had to handle time zones correctly. Storing all times in UTC in the database and displaying them in the user's local time zone was the solution.

**Learning:** Always store temporal data in UTC and convert for display/input based on user preferences.

### Challenge 2: Report Generation

Project managers needed various reports (hours per project, billable hours, employee utilization, etc.). Building flexible reporting queries that could handle different date ranges and filters was complex.

**Learning:** Design your database schema with reporting in mind. Consider denormalization strategically for performance.

### Challenge 3: Handling Corrections

Employees sometimes noticed errors in their timesheets days later. We needed to allow corrections while maintaining an audit trail for billing purposes.

**Learning:** Implement audit logging from the start. It's much harder to add later.

## What I Would Do Differently

Reflecting on the project now, there are several things I'd approach differently:

1. **Testing:** I would have invested more time in automated testing earlier, especially for the billing logic
2. **API Design:** Following REST principles more strictly from the beginning
3. **Documentation:** Documenting the business logic and calculation rules as I wrote them
4. **Performance Testing:** Load testing with realistic data volumes earlier in development

## Key Takeaways

Building the timesheets management system taught me:

1. **Enterprise software has unique challenges:** Real-world business requirements are complex and full of edge cases
2. **Database design is foundational:** Poor schema design compounds problems throughout the application
3. **User experience for business users is critical:** They need to get work done, not learn your app
4. **Validation and error handling matter:** Most bugs in business apps come from insufficient validation
5. **Documentation and testing save time:** Even for internal tools, these practices are worth the investment

While the system never became a commercial product (Jairosoft eventually adopted an existing solution), the experience was invaluable. The skills I developed—working with complex data, building enterprise features, and thinking about real-world constraints—have directly applied to subsequent projects.

## Current Work

Since this internship experience, I've applied these learnings to various commercial projects, from the [M&S Inventory Management system](/projects/ms-inventory/) built with Next.js and Prisma, to maintaining and developing the [OneJourney Tours](/projects/onejourney-tours/) platform.

The timesheet project was a great reminder that sometimes the most valuable learning comes from building things that may not see the light of day, but teach you principles and patterns that shape your entire career.

---

_Have you built internal tools or worked on complex business software? I'd love to hear about your experiences. Feel free to reach out!_
