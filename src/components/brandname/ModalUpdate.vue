<script setup lang="ts">
import {IdModal} from "@/enums/IdModal";
import {closeModal} from "@/helpers/functions";
import {TypeBrandname} from "@/enums/TypeBrandname";
import {Status} from "@/enums/Status";
import {BrandnameValidator} from "@/validator/BrandnameValidator";
import {update} from "@/services/brandnameService";
import {inject} from "vue";
import {useToast} from "vue-toast-notification";

const props = defineProps<{
  brandname: IBrandname
}>();
const $toast = useToast();
const fetchData = inject<() => Promise<void>>("fetchData");
const handleUpdate = async (brandname: IBrandname) => {
  if (BrandnameValidator(brandname)) {
    await update(brandname).then(async (res) => {
      if (res.data.status === 1) {
        await fetchData?.()
        closeModal(IdModal.update)
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
          <h5 class="modal-title" id="staticBackdropLabel">Cập nhật Brandname</h5>
          <button type="button" class="btn-close" @click="() => closeModal(IdModal.update)"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <div class="mb-3">
                <label for="" class="form-label">Tên<span class="text-danger">*</span></label>
                <input type="text" v-model="brandname.name" class="form-control" placeholder="Tên brandname">
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Mã project<span class="text-danger">*</span></label>
                <input type="text" v-model="brandname.projectCode" class="form-control" placeholder="Mã project">
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Kiểu brandname<span class="text-danger">*</span></label>
                <select v-model="brandname.type" class="form-select">
                  <option hidden value="">Chọn</option>
                  <option v-for="type in TypeBrandname" :selected="type == brandname.type" :value="type">{{
                      type
                    }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="" class="form-label">Trạng thái<span class="text-danger">*</span></label>
                <select v-model="brandname.status" class="form-select">
                  <option hidden value="-1">Chọn</option>
                  <option v-for="(value,key) in Status" :selected="key == brandname.status" :value="key">{{
                      value.message
                    }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="" class="form-label">Ngày hết hạn<span class="text-danger">*</span></label>
                <input type="date" v-model="brandname.expirationAt" class="form-control" placeholder="Ngày hết hạn">
              </div>
            </div>
          </div>
          <div class="modal-footer border-0 p-0 ">
            <button type="button" class="btn btn-secondary" @click="() => closeModal(IdModal.update)">Hủy</button>
            <button class="btn btn-primary"
                    @click="()=> handleUpdate(brandname)">Lưu
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>