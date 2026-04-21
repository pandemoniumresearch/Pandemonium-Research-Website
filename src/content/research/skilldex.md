---
slug: skilldex
title: "Skilldex: A Package Manager and Registry for Agent Skill Packages with Hierarchical Scope-Based Distribution"
authors:
  - Sampriti Saha
  - Pranav Hemanth
date: "2026-04-18"
tags:
  - LLM Agents
  - Developer Tooling
  - Skill Packages
  - MCP
summary: "Skilldex addresses gaps in LLM agent skill package tooling by introducing compiler-style format conformance scoring and a skillset abstraction, delivered as an open-source TypeScript CLI with a three-tier hierarchical scope system and community registry."
paperUrl: "https://arxiv.org/abs/2604.16911"
---

## The Problem: No Standard Toolchain for Agent Skills

As LLM agents become more capable, the ecosystem around them has grown fragmented. Skills — discrete, reusable capabilities that agents can invoke — lack the tooling infrastructure that software engineers take for granted in other domains: no package manager, no registry, no format validation. Developers writing skill packages for systems like Claude have no standard way to check whether their packages meet specification, share them with others, or manage dependencies between related skills.

Skilldex is a package manager and registry that fills this gap.

## Compiler-Style Format Conformance Scoring

The first core contribution is a **conformance scorer** that validates skill packages against Anthropic's skill specification. Rather than a binary pass/fail, it produces line-level diagnostics on:

- **Description specificity** — whether the skill's description is precise enough to be reliably selected by an agent at inference time
- **Frontmatter validity** — whether required metadata fields are present and well-formed
- **Structural adherence** — whether the package layout matches the expected schema

The compiler analogy is intentional: like a type checker, the scorer gives actionable, located feedback rather than opaque rejection. This makes it practical to iterate toward conformance rather than guess at what's wrong.

## The Skillset Abstraction

The second contribution is the **skillset**: a bundled collection of related skills with shared assets. Individual skills within a skillset can reference common resources — prompts, configuration, helper files — without duplicating them across packages. This mirrors how software packages group related modules under a single dependency, and solves a real consistency problem: skills that share context but are packaged independently tend to drift out of sync.

## Distribution Architecture

Skilldex provides a **three-tier hierarchical scope system** for skill distribution:

- **Local scope** — skills available only within the current project
- **User scope** — skills available across all projects for a given user
- **Registry scope** — publicly published skills accessible to the community

The community registry is **metadata-only**: it stores package descriptors and pointers, not skill content itself. This keeps the registry lightweight and avoids hosting concerns around proprietary prompt content.

## Implementation

Skilldex ships as a TypeScript CLI (`skillpm` / `spm`) backed by a Hono/Supabase registry. It also exposes a **Model Context Protocol (MCP) server**, allowing agents to interact with the registry directly — querying available skills, checking conformance, and installing packages without leaving an agentic workflow.

The system includes a **human-in-the-loop agent suggestion loop**: given a task description, Skilldex can suggest relevant skills from the registry, with the user confirming or rejecting each suggestion before installation.

The full implementation is open-source.
