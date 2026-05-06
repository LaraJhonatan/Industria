<template>
  <q-page class="q-pa-lg">

    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="page-title q-mb-xs">Perfil de empresa</h1>
        <p class="page-sub">Información comercial visible en el marketplace</p>
      </div>
      <q-btn unelevated label="Guardar cambios" icon="save" color="blue-6" class="action-btn" :loading="saving"
        @click="onSave" />
    </div>

    <div v-if="companyStore.loading && !companyStore.perfil" class="column items-center q-py-xl">
      <q-spinner color="blue-6" size="36px" />
    </div>

    <div v-else class="profile-layout">

      <!-- Columna principal -->
      <div class="profile-main">

        <!-- Datos DIAN -->
        <q-card flat bordered class="profile-card q-mb-md">
          <q-card-section>
            <div class="section-title q-mb-md">Datos oficiales DIAN</div>
            <div class="dian-grid">
              <div class="dian-field">
                <span class="dian-label">NIT</span>
                <span class="dian-value">{{ empresa?.nit }}-{{ empresa?.dv }}</span>
              </div>
              <div class="dian-field">
                <span class="dian-label">Razón social</span>
                <span class="dian-value">{{ empresa?.razonSocial }}</span>
              </div>
              <div class="dian-field">
                <span class="dian-label">Estado</span>
                <q-chip dense :color="empresa?.estado === 'ACTIVA' ? 'green-6' : 'orange-5'" text-color="white"
                  style="font-size:10px;height:20px">
                  {{ empresa?.estado }}
                </q-chip>
              </div>
              <div class="dian-field">
                <span class="dian-label">Tipo contribuyente</span>
                <span class="dian-value">{{ empresa?.tipoContribuyente || '—' }}</span>
              </div>
              <div class="dian-field">
                <span class="dian-label">Correo corporativo</span>
                <span class="dian-value">{{ empresa?.correo || '—' }}</span>
              </div>
              <div class="dian-field">
                <span class="dian-label">Teléfono</span>
                <span class="dian-value">{{ empresa?.telefono || '—' }}</span>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Perfil comercial -->
        <q-card flat bordered class="profile-card q-mb-md">
          <q-card-section>
            <div class="section-title q-mb-md">Perfil comercial</div>
            <div class="form-grid">
              <div class="field-full">
                <label class="field-label">Nombre comercial</label>
                <q-input v-model="form.nombreComercial" outlined dense placeholder="Nombre que verán tus clientes" />
              </div>
              <div class="field-full">
                <label class="field-label">Descripción</label>
                <q-input v-model="form.descripcion" outlined type="textarea" autogrow
                  placeholder="Describe tu empresa, productos y servicios..." />
              </div>
              <div>
                <label class="field-label">Ciudad</label>
                <q-input v-model="form.ciudad" outlined dense placeholder="Bogotá" />
              </div>
              <div>
                <label class="field-label">Departamento</label>
                <q-input v-model="form.departamento" outlined dense placeholder="Cundinamarca" />
              </div>
              <div class="field-full">
                <label class="field-label">Sitio web</label>
                <q-input v-model="form.sitioWeb" outlined dense placeholder="https://miempresa.com" />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Redes sociales -->
        <q-card flat bordered class="profile-card">
          <q-card-section>
            <div class="section-title q-mb-md">Redes sociales</div>
            <div class="form-grid">
              <div>
                <label class="field-label">
                  <q-icon name="business" size="14px" class="q-mr-xs" />LinkedIn
                </label>
                <q-input v-model="form.linkedIn" outlined dense placeholder="https://linkedin.com/company/..." />
              </div>
              <div>
                <label class="field-label">
                  <q-icon name="photo_camera" size="14px" class="q-mr-xs" />Instagram
                </label>
                <q-input v-model="form.instagram" outlined dense placeholder="https://instagram.com/..." />
              </div>
              <div>
                <label class="field-label">
                  <q-icon name="facebook" size="14px" class="q-mr-xs" />Facebook
                </label>
                <q-input v-model="form.facebook" outlined dense placeholder="https://facebook.com/..." />
              </div>
              <div>
                <label class="field-label">
                  <q-icon name="phone" size="14px" class="q-mr-xs" />WhatsApp
                </label>
                <q-input v-model="form.whatsapp" outlined dense placeholder="+57 300 000 0000" />
              </div>
            </div>
          </q-card-section>
        </q-card>

      </div>

      <!-- Sidebar -->
      <div class="profile-sidebar">

        <!-- Logo -->
        <q-card flat bordered class="profile-card q-mb-md">
          <q-card-section>
            <div class="section-title q-mb-md">Logo</div>
            <div class="logo-wrap column items-center q-mb-md">
              <div class="logo-preview">
                <img v-if="form.logoUrl" :src="form.logoUrl" class="logo-img" />
                <q-avatar v-else size="80px" color="blue-6" text-color="white" class="text-h4 text-weight-bold">
                  {{ empresa?.razonSocial?.charAt(0) }}
                </q-avatar>
              </div>
            </div>
            <q-btn unelevated label="Cambiar logo" icon="upload" color="blue-6" class="action-btn full-width"
              @click="logoInput.click()" :loading="uploadingLogo" />
            <input ref="logoInput" type="file" accept="image/*" style="display:none" @change="uploadLogo" />
          </q-card-section>
        </q-card>

        <!-- Banner -->
        <q-card flat bordered class="profile-card">
          <q-card-section>
            <div class="section-title q-mb-md">Banner</div>
            <div class="banner-preview q-mb-md">
              <img v-if="form.bannerUrl" :src="form.bannerUrl" class="banner-img" />
              <div v-else class="banner-empty column items-center justify-center">
                <q-icon name="panorama" size="28px" color="grey-4" />
                <p class="text-caption text-grey-5 q-mt-xs">Sin banner</p>
              </div>
            </div>
            <q-btn unelevated label="Cambiar banner" icon="upload" color="blue-6" class="action-btn full-width"
              @click="bannerInput.click()" :loading="uploadingBanner" />
            <input ref="bannerInput" type="file" accept="image/*" style="display:none" @change="uploadBanner" />
          </q-card-section>
        </q-card>

      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useCompanyStore } from '../../../stores/company-store'
import { uploadsApi } from '../../../api/uploads'

const $q = useQuasar()
const companyStore = useCompanyStore()

const saving = ref(false)
const uploadingLogo = ref(false)
const uploadingBanner = ref(false)
const logoInput = ref(null)
const bannerInput = ref(null)

const empresa = computed(() => companyStore.perfil?.empresa)
const profile = computed(() => companyStore.perfil?.profile)

const form = ref({
  nombreComercial: '',
  descripcion: '',
  ciudad: '',
  departamento: '',
  sitioWeb: '',
  logoUrl: '',
  bannerUrl: '',
  linkedIn: '',
  instagram: '',
  facebook: '',
  whatsapp: '',
})

function populateForm(p) {
  if (!p) return
  form.value = {
    nombreComercial: p.nombreComercial || '',
    descripcion: p.descripcion || '',
    ciudad: p.ciudad || '',
    departamento: p.departamento || '',
    sitioWeb: p.sitioWeb || '',
    logoUrl: p.logoUrl || '',
    bannerUrl: p.bannerUrl || '',
    linkedIn: p.linkedIn || '',
    instagram: p.instagram || '',
    facebook: p.facebook || '',
    whatsapp: p.whatsapp || '',
  }
}

async function uploadLogo(e) {
  const file = e.target.files?.[0]
  if (!file) return
  uploadingLogo.value = true
  try {
    const { data } = await uploadsApi.uploadImage(file, 'empresas')
    form.value.logoUrl = data.url
    $q.notify({ type: 'positive', message: 'Logo actualizado', position: 'top-right' })
  } catch {
    $q.notify({ type: 'negative', message: 'Error al subir logo', position: 'top-right' })
  } finally {
    uploadingLogo.value = false
    e.target.value = ''
  }
}

async function uploadBanner(e) {
  const file = e.target.files?.[0]
  if (!file) return
  uploadingBanner.value = true
  try {
    const { data } = await uploadsApi.uploadImage(file, 'empresas')
    form.value.bannerUrl = data.url
    $q.notify({ type: 'positive', message: 'Banner actualizado', position: 'top-right' })
  } catch {
    $q.notify({ type: 'negative', message: 'Error al subir banner', position: 'top-right' })
  } finally {
    uploadingBanner.value = false
    e.target.value = ''
  }
}

async function onSave() {
  saving.value = true
  try {
    await companyStore.updatePerfil(form.value)
    $q.notify({ type: 'positive', message: 'Perfil actualizado correctamente', position: 'top-right' })
  } catch {
    $q.notify({ type: 'negative', message: 'Error al guardar perfil', position: 'top-right' })
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await companyStore.fetchPerfil()
  populateForm(profile.value)
})
</script>

<style scoped>
.page-title {
  font-size: 24px;
  font-weight: 900;
  color: #0b1220;
  letter-spacing: -.5px;
  margin: 0;
}

.page-sub {
  font-size: 14px;
  color: rgba(11, 18, 32, .5);
  margin: 0;
}

.action-btn {
  border-radius: 10px;
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0;
  height: 40px;
  padding: 0 18px;
}

.profile-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 20px;
  align-items: start;
}

.profile-card {
  border-radius: 14px;
  border: 1.5px solid rgba(11, 18, 32, .08);
}

.section-title {
  font-size: 15px;
  font-weight: 800;
  color: #0b1220;
}

.dian-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.dian-field {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 10px 12px;
  background: #f7f8fb;
  border-radius: 8px;
}

.dian-label {
  font-size: 10.5px;
  font-weight: 700;
  color: rgba(11, 18, 32, .4);
  text-transform: uppercase;
  letter-spacing: .4px;
}

.dian-value {
  font-size: 13.5px;
  font-weight: 700;
  color: #0b1220;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.field-full {
  grid-column: 1 / -1;
}

.field-label {
  font-size: 13px;
  font-weight: 700;
  color: #0b1220;
  display: block;
  margin-bottom: 6px;
}

.logo-wrap {
  text-align: center;
}

.logo-preview {
  width: 90px;
  height: 90px;
  border-radius: 16px;
  overflow: hidden;
  border: 1.5px solid rgba(11, 18, 32, .1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-preview {
  width: 100%;
  height: 90px;
  border-radius: 10px;
  overflow: hidden;
  border: 1.5px solid rgba(11, 18, 32, .1);
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-empty {
  width: 100%;
  height: 100%;
  background: #f7f8fb;
}

@media (max-width: 900px) {
  .profile-layout {
    grid-template-columns: 1fr;
  }

  .dian-grid {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
