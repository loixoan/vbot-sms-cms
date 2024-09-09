<script setup lang="ts">
import {IdModal} from "@/enums/IdModal";
import {closeModal} from "@/helpers/functions";
import {inject} from "vue";
import {useToast} from "vue-toast-notification";
import {CampaignPhoneValidator} from "@/validator/CampaignPhoneValidator";
import {updateSmsCampaignPhone} from "@/services/campaignPhoneService";
import {Status} from "@/enums/Status";
import {CampaignPhoneStatus} from "@/enums/CampaignPhoneStatus";

const props = defineProps<{
  campaigns: ICampaign[],
  campaignPhone: ICampaignPhone
}>();
const $toast = useToast();
const fetchData = inject<() => Promise<void>>("fetchDataCampaignPhone");
const getCountAllData = inject<() => Promise<void>>("getCountAllDataCampaignPhone");
const handleUpdate = async (campaignPhone: ICampaignPhone) => {
  if (CampaignPhoneValidator(campaignPhone)) {
    await updateSmsCampaignPhone(campaignPhone).then(async (res) => {
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
          <h5 class="modal-title" id="staticBackdropLabel">Cập nhật số điện thoại</h5>
          <button type="button" class="btn-close" @click="() => closeModal(IdModal.update)"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <div class="mb-3">
                <label for="" class="form-label">Tên<span class="text-danger">*</span></label>
                <input type="text" v-model="campaignPhone.name" class="form-control" placeholder="Tên">
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Sđt<span class="text-danger">*</span></label>
                <input type="text" v-model="campaignPhone.phone" class="form-control" placeholder="Số điện thoại">
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Chọn campaign<span class="text-danger">*</span></label>
                <select v-model="campaignPhone.campaignId" class="form-select">
                  <option hidden value="0">Chọn</option>
                  <option v-for="campaign in campaigns" :selected="campaign.id == campaignPhone.campaignId" :value="campaign.id">{{
                      campaign.name
                    }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Trạng thái<span class="text-danger">*</span></label>
                <select v-model="campaignPhone.status" class="form-select">
                  <option hidden value="-1">Chọn</option>
                  <option v-for="(value,key) in CampaignPhoneStatus" :selected="key == campaignPhone.status" :value="key">{{
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
                    @click="()=> handleUpdate(campaignPhone)">Lưu
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>