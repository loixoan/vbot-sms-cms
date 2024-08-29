<script setup lang="ts">

import {TypeBrandname} from "@/enums/TypeBrandname";
import {Status} from "@/enums/Status";
import {closeModal} from "@/helpers/functions";
import {create} from "@/services/brandnameService";
import {IdModal} from "@/enums/IdModal";
import {useToast} from "vue-toast-notification";
import {BrandnameValidator} from "@/validator/BrandnameValidator";
import {inject} from "vue";

const props = defineProps<{
  brandname: IBrandname,
}>()
const $toast = useToast();
const fetchData = inject<() => Promise<void>>("fetchData");

const handleCreate = async (brandname: IBrandname) => {
  if (BrandnameValidator(brandname)) {
    await create(brandname).then(async (res) => {
      if (res.data.status === 1) {
        await fetchData?.()
        closeModal(IdModal.create)
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
  <div ref="modalForm" class="modal fade" :id="IdModal.create" data-bs-backdrop="static" tabindex="-1"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" id="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Thêm mới Brandname</h5>
          <button type="button" class="btn-close" @click="() => closeModal(IdModal.create)"></button>
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
            <button type="button" class="btn btn-secondary" @click="() => closeModal(IdModal.create)">Hủy</button>
            <button class="btn btn-primary"
                    @click="()=> handleCreate(brandname)">Lưu
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

