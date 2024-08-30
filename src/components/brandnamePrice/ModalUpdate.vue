<script setup lang="ts">
import {IdModal} from "@/enums/IdModal";
import {closeModal, getAllBrandname} from "@/helpers/functions";
import {inject, onMounted, ref} from "vue";
import {useToast} from "vue-toast-notification";
import {BrandnamePriceValidator} from "@/validator/BrandnamePriceValidator";
import {updateBrandnamePrice} from "@/services/brandnamePriceService";
import {getListBrandname} from "@/services/brandnameService";

const props = defineProps<{
  brandnames: IBrandname[],
  brandnamePrice: IBrandnamePrice
}>();
const $toast = useToast();
const fetchData = inject<() => Promise<void>>("fetchDataBrandnamePrice");
const getCountAllData = inject<() => Promise<void>>("getCountAllDataBrandnamePrice");
const handleUpdate = async (brandnamePrice: IBrandnamePrice) => {
  if (BrandnamePriceValidator(brandnamePrice)) {
    await updateBrandnamePrice(brandnamePrice).then(async (res) => {
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
          <h5 class="modal-title" id="staticBackdropLabel">Cập nhật giá</h5>
          <button type="button" class="btn-close" @click="() => closeModal(IdModal.update)"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <div class="mb-3">
                <label for="" class="form-label">Giá<span class="text-danger">*</span></label>
                <input type="number" v-model="brandnamePrice.price" class="form-control" placeholder="Giá">
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Mã Telco<span class="text-danger">*</span></label>
                <input type="text" v-model="brandnamePrice.telcoCode" class="form-control" placeholder="Mã Telco">
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Kiểu brandname<span class="text-danger">*</span></label>
                <select v-model="brandnamePrice.brandNameId" class="form-select">
                  <option hidden value="0">Chọn</option>
                  <option v-for="brandname in brandnames" :selected="brandname.id == brandnamePrice.brandNameId" :value="brandname.id">{{
                      brandname.name
                    }}
                  </option>
                </select>
              </div>

            </div>
          </div>
          <div class="modal-footer border-0 p-0 ">
            <button type="button" class="btn btn-secondary" @click="() => closeModal(IdModal.update)">Hủy</button>
            <button class="btn btn-primary"
                    @click="()=> handleUpdate(brandnamePrice)">Lưu
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>