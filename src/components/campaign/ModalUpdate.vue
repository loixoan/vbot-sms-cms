<script setup lang="ts">
import {IdModal} from "@/enums/IdModal";
import {closeModal} from "@/helpers/functions";
import {Status} from "@/enums/Status";
import {inject} from "vue";
import {useToast} from "vue-toast-notification";
import {CampaignValidator} from "@/validator/CampaignValidator";
import {updateCampaign} from "@/services/campaignService";
import {CampaignStatus} from "@/enums/CampaignStatus";

const props = defineProps<{
  campaign: ICampaign
  campaignGroups: ICampaignGroup[],
  templates: ITemplate[]
}>();
const $toast = useToast();
const fetchData = inject<() => Promise<void>>("fetchDataCampaign");
const getCountAllData = inject<() => Promise<void>>("getCountAllDataCampaign");
const handleUpdate = async (campaign: ICampaign) => {
  if (CampaignValidator(campaign)) {
    await updateCampaign(campaign).then(async (res) => {
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
          <h5 class="modal-title" id="staticBackdropLabel">Cập nhật chiến dịch</h5>
          <button type="button" class="btn-close" @click="() => closeModal(IdModal.update)"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <div class="mb-3">
                <label for="" class="form-label">Tên<span class="text-danger">*</span></label>
                <input type="text" v-model="campaign.name" class="form-control" placeholder="Tên campaign">
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Mô tả</label>
                <textarea v-model="campaign.description" class="form-control" placeholder="Mô tả"/>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Trạng thái<span class="text-danger">*</span></label>
                <select v-model="campaign.status" class="form-select">
                  <option hidden value="-1">Chọn</option>
                  <option v-for="(value,key) in CampaignStatus" :selected="key == campaign.status" :value="key">{{
                      value.message
                    }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Mã project<span class="text-danger">*</span></label>
                <input type="text" v-model="campaign.projectCode" class="form-control" placeholder="Mã project">
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Người tạo<span class="text-danger">*</span></label>
                <input type="text" v-model="campaign.createBy" class="form-control" placeholder="Người tạo">
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Người cập nhật<span class="text-danger">*</span></label>
                <input type="text" v-model="campaign.updateBy" class="form-control" placeholder="Người cập nhật">
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Chọn nhóm chiến dịch<span class="text-danger">*</span></label>
                <select v-model="campaign.groupId" class="form-select">
                  <option hidden value="0">Chọn</option>
                  <option v-for="campaignGroup in campaignGroups" :selected="campaignGroup.id == campaign.groupId" :value="campaignGroup.id">{{
                      campaignGroup.name
                    }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Chọn Template<span class="text-danger">*</span></label>
                <select v-model="campaign.tempId" class="form-select">
                  <option hidden value="0">Chọn</option>
                  <option v-for="template in templates" :selected="template.id == campaign.tempId" :value="template.id">{{
                      template.name
                    }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0 p-0 ">
            <button type="button" class="btn btn-secondary" @click="() => closeModal(IdModal.update)">Hủy</button>
            <button class="btn btn-primary"
                    @click="()=> handleUpdate(campaign)">Lưu
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>