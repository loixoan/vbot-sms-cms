<script setup lang="ts">

import {Status} from "@/enums/Status";
import {closeModal} from "@/helpers/functions";
import {createSmsCampaignGroup} from "@/services/campaignGroupService";
import {IdModal} from "@/enums/IdModal";
import {useToast} from "vue-toast-notification";
import {inject} from "vue";
import {CampaignGroupValidator} from "@/validator/CampaignGroupValidator";

const props = defineProps<{
  campaignGroup: ICampaignGroup,
}>()
const $toast = useToast();
const fetchData = inject<() => Promise<void>>("fetchDataCampaignGroup");
const getCountAllData = inject<() => Promise<void>>("getCountAllDataCampaignGroup");
const handleCreate = async (campaignGroup: ICampaignGroup) => {
  if (CampaignGroupValidator(campaignGroup)) {
    await createSmsCampaignGroup(campaignGroup).then(async (res) => {
      if (res.data.status === 1) {
        await fetchData?.()
        await getCountAllData?.()
        closeModal(IdModal.create)
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
  <div ref="modalForm" class="modal fade" :id="IdModal.create" data-bs-backdrop="static" tabindex="-1"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" id="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Thêm mới Campaign Group</h5>
          <button type="button" class="btn-close" @click="() => closeModal(IdModal.create)"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <div class="mb-3">
                <label for="" class="form-label">Tên<span class="text-danger">*</span></label>
                <input type="text" v-model="campaignGroup.name" class="form-control" placeholder="Tên campaignGroup">
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Mô tả<span class="text-danger">*</span></label>
                <input type="text" v-model="campaignGroup.description" class="form-control" placeholder="Mô tả">
              </div>
            </div>
          </div>
          <div class="modal-footer border-0 p-0 ">
            <button type="button" class="btn btn-secondary" @click="() => closeModal(IdModal.create)">Hủy</button>
            <button class="btn btn-primary"
                    @click="()=> handleCreate(campaignGroup)">Lưu
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

