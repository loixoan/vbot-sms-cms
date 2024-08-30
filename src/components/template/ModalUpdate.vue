<script setup lang="ts">
import {IdModal} from "@/enums/IdModal";
import {closeModal} from "@/helpers/functions";
import {Status} from "@/enums/Status";
import {updateTemplate} from "@/services/templateService";
import {inject} from "vue";
import {useToast} from "vue-toast-notification";
import {TemplateValidator} from "@/validator/TemplateValidator";

const props = defineProps<{
  brandnames : IBrandname[],
  template: ITemplate
}>();
const $toast = useToast();
const fetchData = inject<() => Promise<void>>("fetchDataTemplate");
const getCountAllData = inject<() => Promise<void>>("getCountAllDataTemplate");
const handleUpdate = async (template: ITemplate) => {
  if (TemplateValidator(template)) {
    await updateTemplate(template).then(async (res) => {
      if (res.data.status === 1) {
        await fetchData?.()
        await getCountAllData?.()
        closeModal(IdModal.update)
        $toast.success(res.data.msg)
      }
    }).catch(error => {
      const errors = error?.response?.data?.errors;
      Object.keys(errors).forEach((key) => {
        $toast.error(errors[key]);
      })
    });
  }
}
</script>

<template>
  <div ref="modalForm" class="modal fade" :id="IdModal.update" data-bs-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" id="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Cập nhật template</h5>
          <button type="button" class="btn-close" @click="() => closeModal(IdModal.update)"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <div class="mb-3">
                <label for="" class="form-label">Tên<span class="text-danger">*</span></label>
                <input type="text" v-model="template.name" class="form-control" placeholder="Tên template">
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Nội dung<span class="text-danger">*</span></label>
                <input type="text" v-model="template.content" class="form-control" placeholder="Nội dung">
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Chọn brandname<span class="text-danger">*</span></label>
                <select v-model="template.brandnameId" class="form-select">
                  <option hidden value="0">Chọn</option>
                  <option v-for="brandname in brandnames" :selected="brandname.id == template.brandnameId" :value="brandname.id">{{
                      brandname.name
                    }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="" class="form-label">Trạng thái<span class="text-danger">*</span></label>
                <select v-model="template.status" class="form-select">
                  <option hidden value="-1">Chọn</option>
                  <option v-for="(value,key) in Status" :selected="key == template.status" :value="key">{{
                      value.message
                    }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0 p-0 ">
            <button type="button" class="btn btn-secondary" @click="() => closeModal(IdModal.update)">Hủy</button>
            <button class="btn btn-primary"
                    @click="()=> handleUpdate(template)">Lưu
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>