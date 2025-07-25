<template>
  <Transition name="modal-fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      @click.self="closeModal"
    >
      <div
        class="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative transform transition-all sm:w-full"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-gray-900">
            <slot name="header">
              Modal Title
            </slot>
          </h3>
          <button
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            @click="closeModal"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            ><path
              d="M6 18L18 6M6 6l12 12"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            /></svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
          <slot />
        </div>

        <!-- Modal Footer (optional) -->
        <div
          v-if="$slots.footer"
          class="modal-footer mt-6 pt-4 border-t border-gray-200 flex justify-end space-x-2"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['close'])
const closeModal = () => {
  emit('close')
}
// Close modal on escape key press
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.addEventListener('keydown', handleEscape)
  } else {
    document.removeEventListener('keydown', handleEscape)
  }
})
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeModal()
  }
}
</script>

<style scoped>
/* Transition styles for the modal */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active .modal-content,
.modal-fade-leave-active .modal-content {
  transition: all 0.3s ease;
}
.modal-fade-enter-from .modal-content,
.modal-fade-leave-to .modal-content {
  transform: scale(0.9);
}
</style>
