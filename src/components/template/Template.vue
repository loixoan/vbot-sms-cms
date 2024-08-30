<script setup lang="ts">
import ModalCreate from "@/components/template/ModalCreate.vue";
import Table from "@/components/template/Table.vue";
import {onMounted, provide, reactive, ref, watch} from "vue";
import {IdModal} from "@/enums/IdModal";
import {getAllBrandname, paramUrl} from "@/helpers/functions";
import {useToast} from "vue-toast-notification";
import {Status} from "@/enums/Status";
import router from "@/router";
import {countAllTemplate, getAllTemplate} from "@/services/templateService";

const $toast = useToast();

const params = reactive({
  page: 0,
  size: 0,
  status: 0,
  brandnameId: 0,
  key: ""
})
const templates = ref<ITemplate[]>([]);
const countAll = ref<number>(0);
const template = reactive<ITemplate>({
  brandname: "", brandnameId: 0, content: "", createAt: "", id: 0, name: "", status: 0
})
const brandnames = ref<IBrandname[]>([]);


const handleClickCreate = () => {
  template.content = "";
  template.brandnameId = 0;
  template.name = "";
  template.status = 0;
}
const fetchDataTemplate = async () => {
  await getAllTemplate(params.page, params.size, params.status, params.brandnameId, params.key)
      .then(res => {
        templates.value = res.data.data;
      })
      .catch(error => $toast.error(error.message));
}
const getCountAllDataTemplate = async () => {
  const res = await countAllTemplate(params.status, params.brandnameId, params.key);
  countAll.value = res.data.data;
}

const handleFilter = () => {
  router.push({
    query: {
      ...paramUrl(),
      brandnameId: params.brandnameId,
      status: params.status,
      key: params.key,
      page: 0
    }
  });
}
provide("fetchDataTemplate", fetchDataTemplate);
provide("getCountAllDataTemplate", getCountAllDataTemplate);
watch([
  () => countAll,
  () => paramUrl().page,
  () => paramUrl().size,
  () => paramUrl().status,
  () => paramUrl().brandnameId,
  () => paramUrl().key,
], async () => {
  params.page = Number(paramUrl().page) || 0;
  params.size = Number(paramUrl().size) || 20;
  params.status = Number(paramUrl().status) || 0;
  params.brandnameId =  Number(paramUrl().brandnameId) || 0;
  params.key = paramUrl().key ? String(paramUrl().key) : "";
  await fetchDataTemplate()
  await getCountAllDataTemplate()
}, {immediate: true})
onMounted(async () => brandnames.value = await getAllBrandname())

</script>

<template>
  <div class="container-fluid">
    <div class="card border-0 mb-2 px-3">
      <ul class="nav mt-3 d-flex">
        <li class="nav-item d-flex col-5">
          <h4 class="page-title">Template</h4>
          <button id="create-btn" type="button" @click="() => handleClickCreate()" data-bs-toggle="modal"
                  :data-bs-target="'#'+IdModal.create" class="btn-nav-link"><i class="fa-solid fa-plus mx-1"></i>Thêm
            mới
          </button>
          <ModalCreate :brandnames="brandnames" :template="template"/>
        </li>
        <li class="nav-item text-uppercase d-flex col-7">
          <select v-model="params.status" class="form-select mx-2 px-3">
            <option value="" hidden>Chọn trạng thái</option>
            <option v-for="(value,key) in Status" :selected="key == params.status" :value="key">{{
                value.message
              }}
            </option>
          </select>
          <select v-model="params.brandnameId" class="form-select mx-2 px-3">
            <option value="0">Chọn Brandname</option>
            <option v-for="brandname in brandnames" :selected="brandname.id == params.brandnameId" :value="brandname.id">{{
                brandname.name
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
      <Table :templates="templates" :brandnames="brandnames" :page="params.page" :size="params.size" :countAll="countAll"/>
    </div>
  </div>
</template>