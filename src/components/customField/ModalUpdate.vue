<script setup lang="ts">
import {IdModal} from "@/enums/IdModal";
import {closeModal} from "@/helpers/functions";
import {Status} from "@/enums/Status";
import {updateCustomField} from "@/services/customFieldService";
import {inject} from "vue";
import {useToast} from "vue-toast-notification";
import {CustomFieldValidator} from "@/validator/CustomFieldValidator";
import {TypeCustomField} from "@/enums/TypeCustomField";

const props = defineProps<{
  customField: ICustomField
}>();
const $toast = useToast();
const fetchData = inject<() => Promise<void>>("fetchDataCustomField");
const getCountAllData = inject<() => Promise<void>>("getCountAllDataCustomField");
const handleUpdate = async (customField: ICustomField) => {
  if (CustomFieldValidator(customField)) {
    await updateCustomField(customField).then(async (res) => {
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
          <h5 class="modal-title" id="staticBackdropLabel">Cập nhật Field</h5>
          <button type="button" class="btn-close" @click="() => closeModal(IdModal.update)"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <div class="mb-3">
                <label for="" class="form-label">Tên<span class="text-danger">*</span></label>
                <input type="text" v-model="customField.name" class="form-control" placeholder="Tên">
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Key<span class="text-danger">*</span></label>
                <input type="text" v-model="customField.key" class="form-control" placeholder="Key">
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Chọn Type<span class="text-danger">*</span></label>
                <select v-model="customField.type" class="form-select">
                  <option hidden value="">Chọn</option>
                  <option v-for="type in TypeCustomField" :selected="type == customField.type" :value="type">{{
                      type
                    }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="" class="form-label">Trường bắt buộc<span class="text-danger">*</span></label>
                <select v-model="customField.isRequired" class="form-select">
                  <option value="false">Không bắt buộc</option>
                  <option value="true">Bắt buộc</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Mô tả<span class="text-danger">*</span></label>
                <input type="text" v-model="customField.description" class="form-control" placeholder="Mô tả">
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Mã project<span class="text-danger">*</span></label>
                <input type="text" v-model="customField.projectCode" class="form-control" placeholder="Mã project">
              </div>
            </div>
          </div>
          <div class="modal-footer border-0 p-0 ">
            <button type="button" class="btn btn-secondary" @click="() => closeModal(IdModal.update)">Hủy</button>
            <button class="btn btn-primary"
                    @click="()=> handleUpdate(customField)">Lưu
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>