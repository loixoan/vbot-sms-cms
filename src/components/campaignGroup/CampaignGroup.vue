<script setup lang="ts">
import {provide, reactive, ref, watch} from "vue";
import {paramUrl} from "@/helpers/functions";
import {useToast} from "vue-toast-notification";
import router from "@/router";

import {
  countAllSmsCampaignGroup,
  getAllSmsCampaignGroup
} from "@/services/campaignGroupService";
import {IdModal} from "@/enums/IdModal";
import ModalCreate from "@/components/campaignGroup/ModalCreate.vue";
import Table from "@/components/campaignGroup/Table.vue";

const $toast = useToast();

const params = reactive({
  page: 0,
  size: 0,
  key: ""
})
const campaignGroups = ref<ICampaignGroup[]>([]);
const countAll = ref<number>(0);
const campaignGroup = reactive<ICampaignGroup>({
  createAt: "", description: "", id: 0, name: ""
})


const handleClickCreate = () => {
  campaignGroup.description = "";
  campaignGroup.name = "";
}
const fetchDataCampaignGroup = async () => {
  await getAllSmsCampaignGroup(params.page, params.size, params.key)
      .then(res => {
        campaignGroups.value = res.data.data;
      })
      .catch(error => $toast.error(error.message));
}
const getCountAllDataCampaignGroup = async () => {
  const res = await countAllSmsCampaignGroup(params.key);
  countAll.value = res.data.data;
}

const handleFilter = () => {
  router.push({
    query: {
      ...paramUrl(),
      key: params.key,
      page: 0
    }
  });
}
provide("fetchDataCampaignGroup", fetchDataCampaignGroup);
provide("getCountAllDataCampaignGroup", getCountAllDataCampaignGroup);
watch([
  () => countAll,
  () => paramUrl().page,
  () => paramUrl().size,
  () => paramUrl().key,
], async () => {
  params.page = Number(paramUrl().page) || 0;
  params.size = Number(paramUrl().size) || 20;
  params.key = paramUrl().key ? String(paramUrl().key) : "";
  await fetchDataCampaignGroup()
  await getCountAllDataCampaignGroup()
}, {immediate: true})

</script>

<template>
  <div class="container-fluid">
    <div class="card border-0 mb-2 px-3">
      <ul class="nav mt-3 d-flex">
        <li class="nav-item d-flex col-9">
          <h4 class="page-title">Campaign Group</h4>
          <button id="create-btn" type="button" @click="() => handleClickCreate()" data-bs-toggle="modal"
                  :data-bs-target="'#'+IdModal.create" class="btn-nav-link"><i class="fa-solid fa-plus mx-1"></i>Thêm
            mới
          </button>
          <ModalCreate :campaignGroup="campaignGroup"/>
        </li>
        <li class="nav-item text-uppercase d-flex col-3">
          <input id="key" class="form-control mr-sm-2 px-2" type="search"
                 placeholder="Tìm kiếm" aria-label="Search"
                 style="height: 100%" v-model="params.key">
          <button class="btn btn-primary mx-2 my-2 my-sm-0" @click="() => handleFilter()">Tìmkiếm</button>
        </li>
      </ul>
    </div>
    <div>
      <Table :campaignGroups="campaignGroups" :page="params.page" :size="params.size" :countAll="countAll"/>
    </div>
  </div>
</template>