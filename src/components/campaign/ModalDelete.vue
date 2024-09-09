<script setup lang="ts">
import {closeModal} from "@/helpers/functions";
import {IdModal} from "@/enums/IdModal";
import {useToast} from "vue-toast-notification";
import {inject} from "vue";
import {deleteCampaign} from "@/services/campaignService";

const props = defineProps<{
  id: number,
}>()
const $toast = useToast();
const fetchData = inject<() => Promise<void>>("fetchDataCampaign");
const getCountAllData = inject<() => Promise<void>>("getCountAllDataCampaign");
const handleDelete = async (id:number) => {
  await deleteCampaign(id).then(async (res) => {
    if (res.data.status === 1) {
      await fetchData?.()
      await getCountAllData?.()
      closeModal(IdModal.delete)
      $toast.success(res.data.msg)
    }
  }).catch(error => {
    const errors = error?.response?.data?.errors;
    Object.keys(errors).forEach((key) => {
      $toast.error(errors[key]);
    })
  });

}
</script>
<template>
  <div ref="modalForm" class="modal fade" :id="IdModal.delete" data-bs-backdrop="static" tabindex="-1"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" id="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Xóa chiến dịch có id là : {{id}}</h5>
          <button type="button" class="btn-close" @click="() => closeModal(IdModal.delete)"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <p>Vui lòng xác nhận bạn muốn xoá dữ liệu này.</p>
          </div>
          <div class="modal-footer border-0 p-0 ">
            <button type="button" class="btn btn-secondary" @click="() => closeModal(IdModal.delete)">Hủy</button>
            <button class="btn btn-primary"
                    @click="()=> handleDelete(id)">Xóa
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

