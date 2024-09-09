<script setup lang="ts">
import {provide, reactive, ref, watch} from "vue";
import { paramUrl} from "@/helpers/functions";
import {useToast} from "vue-toast-notification";
import router from "@/router";
import {countAllCustomField, getAllCustomField} from "@/services/customFieldService";
import {IdModal} from "@/enums/IdModal";
import {Status} from "@/enums/Status";
import {TypeCustomField} from "@/enums/TypeCustomField";
import Table from "@/components/customField/Table.vue"
import ModalCreate from "@/components/customField/ModalCreate.vue"
const $toast = useToast();

const params = reactive({
  page: 0,
  size: 0,
  type: '',
  isRequired: false,
  key: ""
})
const customFields = ref<ICustomField[]>([]);
const countAll = ref<number>(0);
const customField = reactive<ICustomField>({
  description: "", id: 0, isRequired: false, key: "", name: "", projectCode: "", type: ""
})
const handleClickCreate = () => {
  customField.description = "";
  customField.key = "";
  customField.name = "";
  customField.projectCode = "";
  customField.type = "";
}
const fetchDataCustomField = async () => {
  await getAllCustomField(params.page, params.size, params.type, params.isRequired, params.key)
      .then(res => {
        customFields.value = res.data.data;
      })
      .catch(error => $toast.error(error.message));
}
const getCountAllDataCustomField = async () => {
  const res = await countAllCustomField(params.type, params.isRequired, params.key);
  countAll.value = res.data.data;
}

const handleFilter = () => {
  router.push({
    query: {
      ...paramUrl(),
      type: params.type,
      isRequired: String(params.isRequired),
      key: params.key,
      page: 0
    }
  });
}
provide("fetchDataCustomField", fetchDataCustomField);
provide("getCountAllDataCustomField", getCountAllDataCustomField);
watch([
  () => countAll,
  () => paramUrl().page,
  () => paramUrl().size,
  () => paramUrl().type,
  () => paramUrl().isRequired,
  () => paramUrl().key,
], async () => {
  params.page = Number(paramUrl().page) || 0;
  params.size = Number(paramUrl().size) || 20;
  params.type = paramUrl().type ? String(paramUrl().type) : "";
  params.isRequired = paramUrl().isRequired && String(paramUrl().isRequired) == 'true' ? true : false;
  params.key = paramUrl().key ? String(paramUrl().key) : "";
  await fetchDataCustomField()
  await getCountAllDataCustomField()
}, {immediate: true})
</script>

<template>
<div class="container-fluid">
  <div class="card border-0 mb-2 px-3">
    <ul class="nav mt-3 d-flex">
      <li class="nav-item d-flex col-5">
        <h4 class="page-title">Field</h4>
        <button id="create-btn" type="button" @click="() => handleClickCreate()" data-bs-toggle="modal"
                :data-bs-target="'#'+IdModal.create" class="btn-nav-link"><i class="fa-solid fa-plus mx-1"></i>Thêm
          mới
        </button>
        <ModalCreate :customField="customField"/>
      </li>
      <li class="nav-item text-uppercase d-flex col-7">
        <select v-model="params.type" class="form-select mx-2 px-3">
          <option value="">Chọn Type</option>
          <option v-for="type in TypeCustomField" :selected="type == params.type" :value="type">
            {{
              type
            }}
          </option>
        </select>
        <select v-model="params.isRequired" class="form-select mx-2 px-3">
          <option hidden="" value="">Trường bắt buộc</option>
          <option value="true">Bắt buộc</option>
          <option value="false">Không bắt buộc</option>
        </select>
        <input id="key" class="form-control mr-sm-2 px-2" type="search"
               placeholder="Tìm kiếm" aria-label="Search"
               style="height: 100%" v-model="params.key">
        <button class="btn btn-primary mx-2 my-2 my-sm-0" @click="() => handleFilter()">Tìmkiếm</button>
      </li>
    </ul>
  </div>
  <div>
    <Table :customFields="customFields" :page="params.page" :size="params.size"
           :countAll="countAll"/>
  </div>
</div>
</template>