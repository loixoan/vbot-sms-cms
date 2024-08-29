<script setup lang="ts">
import ModalCreate from "@/components/brandname/ModalCreate.vue";
import Table from "@/components/brandname/Table.vue";
import {provide, reactive, ref, watch, watchEffect} from "vue";
import {countAll, getAll} from "@/services/brandnameService";
import {IdModal} from "@/enums/IdModal";
import {useRoute} from "vue-router";
import router from "@/router";
import {paramUrl} from "@/helpers/functions";

const page = ref<number>(0);
const size = ref<number>( 0);
const brandnames = ref<IBrandname[]>([]);
const countAllBrandname = ref<number>(0);
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
  const res = await getAll(page.value, size.value);
  brandnames.value = res.data.data;
}
const getCountAllData = async () => {
  const res = await countAll();
  countAllBrandname.value = res.data.data;
}
provide("fetchData", fetchData);
watch([() =>paramUrl().page, () => paramUrl().size], async () => {
  page.value = Number(paramUrl().page) || 0;
  size.value = Number(paramUrl().size) || 20;
  await fetchData()
  await getCountAllData()
}, {immediate: true})
</script>

<template>
  <div class="container-fluid">
    <div class="card border-0 mb-2 px-3">
      <ul class="nav mt-3 d-flex">
        <li class="nav-item d-flex col-4">
          <h4 class="page-title">Brandname</h4>
          <button id="create-btn" type="button" @click="() => handleClickCreate()" data-bs-toggle="modal"
                  :data-bs-target="'#'+IdModal.create" class="btn-nav-link"><i class="fa-solid fa-plus mx-1"></i>Thêm
            mới
          </button>
          <ModalCreate :brandname="brandname"/>
        </li>
      </ul>
    </div>
    <div>
      <Table :brandnames="brandnames" v-model:page="page" :size="size" :countAllBrandname="countAllBrandname"/>
    </div>
  </div>
</template>