<template>
  <div>
    <transition name="modal">
        <div class="overlay" @click.self="closeModal">
          <div class="modal-wrapper">
          <div class="modal" role="dialog">

            <header
              class="modal-header"
              id="modalTitle"
            >
              <slot name="header">
                This is the default tile!

                <button
                  type="button"
                  class="btn-close"
                  @click="closeModal"
                  aria-label="Close modal"
                >
                  x
                </button>
              </slot>
            </header>
            <section
              class="modal-body"
              id="modalDescription"
            >
              <slot name="body">
              </slot>
            </section>
          </div>
          </div>
        </div>

    </transition>
    <button @click="isOpen = !isOpen;">
      {{ isOpen ? "Close" : "Open" }} modal
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    closeModal: function () {
      this.$emit('close')
      console.log('close modal')
    }
  }
}
</script>

<style scoped>
  .modal {
    width: auto;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px 3px;
    transition: all 0.2s ease-in;
    font-family: Helvetica, Arial, sans-serif;
    display:inline-block;
  }
  .modal-wrapper {
    display: flex;
    align-items:center;
    justify-content:center;
    height:100%;
  }
  .fadeIn-enter {
    opacity: 0;
  }

  .fadeIn-leave-active {
    opacity: 0;
    transition: all 0.2s step-end;
  }

  .fadeIn-enter .modal,
  .fadeIn-leave-active.modal {
    transform: scale(1.1);
  }
  button {
    padding: 7px;
    margin-top: 10px;
    background-color: green;
    color: white;
    font-size: 1.1rem;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #00000094;
    z-index: 999;
    transition: opacity 0.2s ease;
  }
  .modal-header h3 {
    margin-top: 45px;
    color: #42b983;
  }

  .modal-body {
    margin: 10px 0;
    overflow-y: auto;
    position: relative;
    padding: 20px 10px;
    height: 600px;
  }
</style>
