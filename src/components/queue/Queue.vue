<script setup lang="ts">
import {provide, reactive, ref, watch} from "vue";
import {paramUrl} from "@/helpers/functions";
import {useToast} from "vue-toast-notification";
import router from "@/router";

import {
  countAllQueue,
  getAllQueue
} from "@/services/queueService";
import Table from "@/components/queue/Table.vue";
import {CampaignStatus} from "@/enums/CampaignStatus";

const $toast = useToast();

const params = reactive({
  page: 0,
  size: 0,
  smsCampaignCode: "",
  brandNameCode: "",
  tempCode: "",
  status: 0,
  key: ""
})
const queues = ref<IQueue[]>([]);
const countAll = ref<number>(0);
const fetchDataQueue = async () => {
  await getAllQueue(params.page, params.size, params.smsCampaignCode, params.brandNameCode, params.tempCode, params.status, params.key)
      .then(res => {
        queues.value = res.data.data;
      })
      .catch(error => $toast.error(error.message));
}
const getCountAllDataQueue = async () => {
  const res = await countAllQueue(params.smsCampaignCode, params.brandNameCode, params.tempCode, params.status, params.key);
  countAll.value = res.data.data;
}

const handleFilter = () => {
  router.push({
    query: {
      ...paramUrl(),
      key: params.key,
      smsCampaignCode: params.smsCampaignCode,
      brandNameCode: params.brandNameCode,
      tempCode: params.tempCode,
      status: params.status,
      page: 0
    }
  });
}
provide("fetchDataQueue", fetchDataQueue);
provide("getCountAllDataQueue", getCountAllDataQueue);
watch([
  () => countAll,
  () => paramUrl().page,
  () => paramUrl().size,
  () => paramUrl().key,
  () => paramUrl().smsCampaignCode,
  () => paramUrl().brandNameCode,
  () => paramUrl().tempCdoe,
  () => paramUrl().status,
], async () => {
  params.page = Number(paramUrl().page) || 0;
  params.size = Number(paramUrl().size) || 20;
  params.key = paramUrl().key ? String(paramUrl().key) : "";
  params.smsCampaignCode = paramUrl().projectCode ? String(paramUrl().projectCode) : ""
  params.brandNameCode = paramUrl().projectCode ? String(paramUrl().projectCode) : ""
  params.tempCode = paramUrl().projectCode ? String(paramUrl().projectCode) : ""
  params.status = Number(paramUrl().status) || 0
  await fetchDataQueue()
  await getCountAllDataQueue()
}, {immediate: true})

</script>

<template>
  <div class="container-fluid">
    <div class="card border-0 mb-2 px-3">
      <ul class="nav mt-3 d-flex">
        <li class="nav-item d-flex col-9">
          <h4 class="page-title">Queue</h4>
        </li>
        <li class="nav-item text-uppercase d-flex col-3">
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
      <Table :queues="queues" :page="params.page" :size="params.size" :countAll="countAll"/>
    </div>
  </div>
</template>