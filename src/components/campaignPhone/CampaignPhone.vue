<script setup lang="ts">
import {onMounted, provide, reactive, ref, watch} from "vue";
import {getAllBrandname, getAllCampaign, paramUrl} from "@/helpers/functions";
import {useToast} from "vue-toast-notification";
import router from "@/router";

import {
  countAllSmsCampaignPhone,
  getAllSmsCampaignPhone
} from "@/services/campaignPhoneService";
import {IdModal} from "@/enums/IdModal";
import ModalCreate from "@/components/campaignPhone/ModalCreate.vue";
import Table from "@/components/campaignPhone/Table.vue";
import {CampaignPhoneStatus} from "@/enums/CampaignPhoneStatus";

const $toast = useToast();

const params = reactive({
  page: 0,
  size: 0,
  status: -1,
  campaignId: 0,
  key: ""
})
const campaignPhones = ref<ICampaignPhone[]>([]);
const countAll = ref<number>(0);
const campaignPhone = reactive<ICampaignPhone>({
  campaignId: 0, campaignName: "", id: 0, name: "", phone: "", status: 0
})
const campaigns = ref<ICampaign[]>([]);


const handleClickCreate = () => {
  campaignPhone.phone = "";
  campaignPhone.name = "";
}
const fetchDataCampaignPhone = async () => {
  await getAllSmsCampaignPhone(params.page, params.size, params.key,params.status,params.campaignId)
      .then(res => {
        campaignPhones.value = res.data.data;
      })
      .catch(error => $toast.error(error.message));
}
const getCountAllDataCampaignPhone = async () => {
  const res = await countAllSmsCampaignPhone(params.key,params.status,params.campaignId);
  countAll.value = res.data.data;
}

const handleFilter = () => {
  router.push({
    query: {
      ...paramUrl(),
      key: params.key,
      status: params.status,
      smsCampaignId: params.campaignId,
      page: 0
    }
  });
}
provide("fetchDataCampaignPhone", fetchDataCampaignPhone);
provide("getCountAllDataCampaignPhone", getCountAllDataCampaignPhone);
watch([
  () => countAll,
  () => paramUrl().page,
  () => paramUrl().size,
  () => paramUrl().status,
  () => paramUrl().smsCampaignId,
  () => paramUrl().key,
], async () => {
  params.page = Number(paramUrl().page) || 0;
  params.size = Number(paramUrl().size) || 20;
  params.key = paramUrl().key ? String(paramUrl().key) : "";
  params.status = paramUrl().status ? Number(paramUrl().status) : -1;
  params.campaignId = Number(paramUrl().smsCampaignId) || 0;
  await fetchDataCampaignPhone()
  await getCountAllDataCampaignPhone()
}, {immediate: true})
onMounted(async () => campaigns.value = await getAllCampaign())

</script>

<template>
  <div class="container-fluid">
    <div class="card border-0 mb-2 px-3">
      <ul class="nav mt-3 d-flex">
        <li class="nav-item d-flex col-7">
          <h4 class="page-title">Campaign Phone</h4>
          <button id="create-btn" type="button" @click="() => handleClickCreate()" data-bs-toggle="modal"
                  :data-bs-target="'#'+IdModal.create" class="btn-nav-link"><i class="fa-solid fa-plus mx-1"></i>Thêm
            mới
          </button>
          <ModalCreate :campaignPhone="campaignPhone" :campaigns="campaigns"/>
        </li>
        <li class="nav-item text-uppercase d-flex col-5">
          <select v-model="params.campaignId" class="form-select mx-2 px-3">
            <option value="0">Chọn Brandname</option>
            <option v-for="campaign in campaigns" :selected="campaign.id == params.campaignId" :value="campaign.id">{{
                campaign.name
              }}
            </option>
          </select>
          <select v-model="params.status" class="form-select mx-2 px-3" name="status" id="status"
                  aria-label="Default select example">
            <option value="-1">Trạng thái</option>
            <option v-for="(value,key) in CampaignPhoneStatus" :selected="key == params.status" :value="key">{{
                value.message
              }}
            </option>
          </select> <input id="key" class="form-control mr-sm-2 px-2" type="search"
                 placeholder="Tìm kiếm" aria-label="Search"
                 style="height: 100%" v-model="params.key">
          <button class="btn btn-primary mx-2 my-2 my-sm-0" @click="() => handleFilter()">Tìmkiếm</button>
        </li>
      </ul>
    </div>
    <div>
      <Table :campaignPhones="campaignPhones" :campaigns="campaigns" :page="params.page" :size="params.size" :countAll="countAll"/>
    </div>
  </div>
</template>