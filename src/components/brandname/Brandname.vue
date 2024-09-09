<script setup lang="ts">
import ModalCreate from "@/components/brandname/ModalCreate.vue";
import Table from "@/components/brandname/Table.vue";
import {provide, reactive, ref, watch, watchEffect} from "vue";
import {countAllBrandname, getAllBrandname} from "@/services/brandnameService";
import {IdModal} from "@/enums/IdModal";
import {paramUrl} from "@/helpers/functions";
import {useToast} from "vue-toast-notification";
import {TypeBrandname} from "@/enums/TypeBrandname";
import {Status} from "@/enums/Status";
import router from "@/router";
import {toastConfig} from "@/utils/toastConfig";

const $toast = useToast();

const params = reactive({
  page: 0,
  size: 0,
  status: -1,
  type: "",
  key: ""
})
const brandnames = ref<IBrandname[]>([]);
const countAll = ref<number>(0);
const brandname = reactive<IBrandname>({
  code: "",
  createAt: "",
  expirationAt: "",
  id: 0,
  name: "",
  projectCode: "",
  status: 0,
  type: "",
})
const handleClickCreate = () => {
  brandname.code = "";
  brandname.expirationAt = "";
  brandname.name = "";
  brandname.projectCode = "";
  brandname.status = 0;
  brandname.type = "";
}
const fetchData = async () => {
  await getAllBrandname(params.page, params.size, params.status, params.type, params.key)
      .then(res => {
        brandnames.value = res.data.data;
      })
      .catch(error => $toast.error(error.message));
}
const getCountAllData = async () => {
  const res = await countAllBrandname(params.status, params.type, params.key);
  countAll.value = res.data.data;
}

const handleFilter = () => {
  router.push({
    query: {
      ...paramUrl(),
      type: params.type,
      status: params.status,
      key: params.key,
      page: 0
    }
  });
}
provide("fetchData", fetchData);
provide("getCountAllData", getCountAllData);
watch([
  () => countAll,
  () => paramUrl().page,
  () => paramUrl().size,
  () => paramUrl().status,
  () => paramUrl().type,
  () => paramUrl().key,
], async () => {
  params.page = Number(paramUrl().page) || 0;
  params.size = Number(paramUrl().size) || 20;
  params.status = paramUrl().status ? Number(paramUrl().status) : -1;
  params.type = paramUrl().type ? String(paramUrl().type) : "";
  params.key = paramUrl().key ? String(paramUrl().key) : "";
  await fetchData()
  await getCountAllData()
}, {immediate: true})
</script>

<template>
  <div class="container-fluid">
    <div class="card border-0 mb-2 px-3">
      <ul class="nav mt-3 d-flex">
        <li class="nav-item d-flex col-5">
          <h4 class="page-title">Brandname</h4>
          <button id="create-btn" type="button" @click="() => handleClickCreate()" data-bs-toggle="modal"
                  :data-bs-target="'#'+IdModal.create" class="btn-nav-link"><i class="fa-solid fa-plus mx-1"></i>Thêm
            mới
          </button>
          <ModalCreate :brandname="brandname"/>
        </li>
        <li class="nav-item text-uppercase d-flex col-7">
          <select v-model="params.type" class="form-select mx-2 px-3 form-select-sm" id="type"
                  aria-label=".form-select-sm example" name="type">
            <option value="">Loại brandname</option>
            <option v-for="type in TypeBrandname" :selected="type == params.type" :value="type">{{
                type
              }}
            </option>
          </select>
          <select v-model="params.status" class="form-select mx-2 px-3" name="status" id="status"
                  aria-label="Default select example">
            <option value="-1">Trạng thái</option>
            <option v-for="(value,key) in Status" :selected="key == params.status" :value="key">{{
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
      <Table :brandnames="brandnames" :page="params.page" :size="params.size" :countAll="countAll"/>
    </div>
  </div>
</template>