<script setup lang="ts">
import ModalCreate from "@/components/campaign/ModalCreate.vue";
import Table from "@/components/campaign/Table.vue";
import {onMounted, provide, reactive, ref, watch, watchEffect} from "vue";
import {countAllCampaign, getAllCampaign} from "@/services/campaignService";
import {IdModal} from "@/enums/IdModal";
import {checkTypeField, getAllCampaignGroup, getAllTemplate, paramUrl} from "@/helpers/functions";
import {useToast} from "vue-toast-notification";
import {Status} from "@/enums/Status";
import router from "@/router";
import {CampaignStatus} from "@/enums/CampaignStatus";
import {TypeCustomField} from "@/enums/TypeCustomField";

const $toast = useToast();

const params = reactive({
  page: 0,
  size: 0,
  status: -1,
  projectCode: "",
  groupId: 0,
  tempId: 0,
  key: ""
})
const campaigns = ref<ICampaign[]>([]);
const countAll = ref<number>(0);
const campaign = reactive<ICampaign>({
  campaignSubCount: 0,
  createBy: "",
  description: "",
  groupId: 0,
  groupName: "",
  id: 0,
  name: "",
  status: 0,
  tempId: 0,
  tempName: "",
  updateBy: "",
  projectCode: ""

})
const campaignGroups = ref<ICampaignGroup[]>([]);
const templates = ref<ITemplate[]>([]);
const handleClickCreate = () => {
  campaign.groupId = 0;
  campaign.description = "";
  campaign.name = "";
  campaign.projectCode = "";
  campaign.status = 0;
  campaign.tempId = 0;
  campaign.createBy = "";
  campaign.updateBy = "";
}
const fetchDataCampaign = async () => {
  await getAllCampaign(params.page, params.size, params.status, params.projectCode, params.groupId, params.tempId, params.key)
      .then(res => {
        campaigns.value = res.data.data;
      })
      .catch(error => $toast.error(error.message));
}
const getCountAllDataCampaign = async () => {
  const res = await countAllCampaign(params.status, params.projectCode, params.groupId, params.tempId, params.key);
  countAll.value = res.data.data;
}

const handleFilter = () => {
  router.push({
    query: {
      ...paramUrl(),
      status: params.status,
      projectCode: params.projectCode,
      groupId: params.groupId,
      tempId: params.tempId,
      key: params.key,
      page: 0
    }
  });
}
provide("fetchDataCampaign", fetchDataCampaign);
provide("getCountAllDataCampaign", getCountAllDataCampaign);
watch([
  () => countAll,
  () => paramUrl().page,
  () => paramUrl().size,
  () => paramUrl().status,
  () => paramUrl().projectCode,
  () => paramUrl().groupId,
  () => paramUrl().tempId,
  () => paramUrl().key,
], async () => {
  params.page = Number(paramUrl().page) || 0;
  params.size = Number(paramUrl().size) || 20;
  params.status = paramUrl().status ? Number(paramUrl().status) : -1;
  params.projectCode = paramUrl().projectCode ? String(paramUrl().projectCode) : "";
  params.key = paramUrl().key ? String(paramUrl().key) : "";
  params.groupId = Number(paramUrl().groupId) || 0;
  params.tempId = Number(paramUrl().tempId) || 0;

  await fetchDataCampaign()
  await getCountAllDataCampaign()
}, {immediate: true})
onMounted(async () => {
  campaignGroups.value = await getAllCampaignGroup();
  templates.value = await getAllTemplate();
})
</script>

<template>
  <div class="container-fluid">
    <div class="card border-0 mb-2 px-3">
      <ul class="nav mt-3 d-flex">
        <li class="nav-item d-flex col-5">
          <h4 class="page-title">Chiến dịch</h4>
          <button id="create-btn" type="button" @click="() => handleClickCreate()" data-bs-toggle="modal"
                  :data-bs-target="'#'+IdModal.create" class="btn-nav-link"><i class="fa-solid fa-plus mx-1"></i>Thêm
            mới
          </button>
          <ModalCreate :campaign="campaign" :campaignGroups="campaignGroups" :templates="templates"/>

        </li>
        <li class="nav-item text-uppercase d-flex col-7">
          <select v-model="params.tempId" class="form-select mx-2 px-3" name="status" id="status"
                  aria-label="Default select example">
            <option value="0">Chọn Template</option>
            <option v-for="template in templates" :selected="template.id == params.tempId" :value="template.id">{{
                template.name
              }}
            </option>
          </select>
          <select v-model="params.groupId" class="form-select mx-2 px-3" name="status" id="status"
                  aria-label="Default select example">
            <option value="0">Chọn nhóm chiến dịch</option>
            <option v-for="campaignGroup in campaignGroups" :selected="campaignGroup.id == params.groupId"
                    :value="campaignGroup.id">{{
                campaignGroup.name
              }}
            </option>
          </select>
          <select v-model="params.status" class="form-select mx-2 px-3" name="status" id="status"
                  aria-label="Default select example">
            <option value="-1">Trạng thái</option>
            <option v-for="(value,key) in CampaignStatus" :selected="key == params.status" :value="key">{{
                value.message
              }}
            </option>
          </select>
          <input id="key" class="form-control mr-sm-2 px-2" type="search"
                 placeholder="Tìm kiếm" aria-label="Search"
                 style="height: 100%" v-model="params.key">
          <button class="btn btn-primary mx-2 my-2 my-sm-0" @click="() => handleFilter()">Tìmkiếm</button>
        </li>
      </ul>
    </div>
    <div>
      <Table :campaigns="campaigns" :page="params.page" :size="params.size" :countAll="countAll"
             :campaignGroups="campaignGroups" :templates="templates"/>
    </div>
  </div>
</template>