<template>
  <label class="field-label">
    {{ label }}
    <span v-if="required" class="req">*</span>
    <span v-else-if="optional" class="field-optional">(opcional)</span>
    <q-icon v-if="help" name="help_outline" size="15px" class="field-help-icon">
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 6]" class="field-tooltip"
        max-width="260px">
        {{ help }}
      </q-tooltip>
    </q-icon>
  </label>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  required: { type: Boolean, default: false },
  optional: { type: Boolean, default: false },
  help: { type: String, default: '' },
})
</script>

<style scoped>
.field-label {
  font-size: 13px;
  font-weight: 700;
  color: #0b1220;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 6px;
}

.req {
  color: #dc2626;
}

.field-optional {
  color: rgba(11, 18, 32, .4);
  font-weight: 600;
  font-size: 11.5px;
}

.field-help-icon {
  color: rgba(11, 18, 32, .3);
  cursor: help;
  transition: color 140ms;
}

.field-help-icon:hover {
  color: #0071e3;
}

.field-tooltip {
  font-size: 12px;
  line-height: 1.5;
  background: #0b1220;
  padding: 8px 10px;
  border-radius: 8px;
}
</style>
