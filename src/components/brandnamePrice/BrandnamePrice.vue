<script setup lang="ts">
import Table from "@/components/brandnamePrice/Table.vue";
import {onMounted, provide, reactive, ref, watch} from "vue";
import {IdModal} from "@/enums/IdModal";
import {getAllBrandname, paramUrl} from "@/helpers/functions";
import {useToast} from "vue-toast-notification";
import router from "@/router";
import {countAllBrandnamePrice, getAllBrandnamePrice} from "@/services/brandnamePriceService";
import ModalCreate from "@/components/brandnamePrice/ModalCreate.vue";

const $toast = useToast();

const params = reactive({
  page: 0,
  size: 0,
  status: 0,
  type: "",
  key: ""
})
const brandnamePrices = ref<IBrandnamePrice[]>([]);
const countAll = ref<number>(0);
const brandnamePrice = reactive<IBrandnamePrice>({
  brandName: "",
  brandNameId: 0,
  id: 0,
  price: 0, 
  telcoCode: ""

})
const brandnames = ref<IBrandname[]>([])


const handleClickCreate = () => {
  brandnamePrice.price = 0;
  brandnamePrice.brandNameId = 0;
  brandnamePrice.telcoCode = "";
}
const fetchDataBrandnamePrice = async () => {
  await getAllBrandnamePrice(params.page, params.size, params.key)
      .then(res => {
        brandnamePrices.value = res.data.data;
      })
      .catch(error => $toast.error(error.message));
}
const getCountAllDataBrandnamePrice = async () => {
  const res = await countAllBrandnamePrice(params.key);
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
provide("fetchDataBrandnamePrice", fetchDataBrandnamePrice);
provide("getCountAllDataBrandnamePrice", getCountAllDataBrandnamePrice);
watch([
  () => countAll,
  () => paramUrl().page,
  () => paramUrl().size,
  () => paramUrl().key,
], async () => {
  params.page = Number(paramUrl().page) || 0;
  params.size = Number(paramUrl().size) || 20;
  params.key = paramUrl().key ? String(paramUrl().key) : "";

  await fetchDataBrandnamePrice()
  await getCountAllDataBrandnamePrice()
}, {immediate: true})
onMounted(async () => brandnames.value = await getAllBrandname())
</script>

<template>
  <div class="container-fluid">
    <div class="card border-0 mb-2 px-3">
      <ul class="nav mt-3 d-flex">
        <li class="nav-item d-flex col-9">
          <h4 class="page-title">Brandname Price</h4>
          <button id="create-btn" type="button" @click="() => handleClickCreate()" data-bs-toggle="modal"
                  :data-bs-target="'#'+IdModal.create" class="btn-nav-link"><i class="fa-solid fa-plus mx-1"></i>Thêm
            mới
          </button>
          <ModalCreate :brandnames="brandnames" :brandnamePrice="brandnamePrice"/>
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
      <Table :brandnamePrices="brandnamePrices" :brandnames="brandnames" :page="params.page" :size="params.size" :countAll="countAll"/>
    </div>
  </div>
</template>