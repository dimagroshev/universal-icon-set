---
layout: doc
footer: false
aside: false
editLink: false
next: false
prev: false
sidebar: true
---

<script setup>
import { useData } from 'vitepress'
import IconPreview from '../.vitepress/components/Icons/IconPreview.vue'

const { params } = useData()
</script>

# {{ params.name }} <Badge v-if="!params.isFree" type="tip" text="PRO" />

<div class="icon-preview-block">
  <IconPreview :name="params.name" />

  ::: code-group

  <!--@include:../.vitepress/components/md-parts/react/code.md-->
  <!--@include:../.vitepress/components/md-parts/vue/code.md-->
  <!--@include:../.vitepress/components/md-parts/vue2/code.md-->

  :::
</div>

## Props

<!--@include:../.vitepress/components/md-parts/props.md-->

<style>
  .icon-preview-block {
    display: flex;
    margin-top: 40px;
    gap: 40px;
  }

  .icon-preview-block .vp-code-group {
    margin: 0;
    flex: 1;
  }
</style>
