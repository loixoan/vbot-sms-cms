<script setup lang="ts">
import ModalCreate from "@/components/brandname/ModalCreate.vue";
import Table from "@/components/brandname/Table.vue";
import {reactive, ref, watchEffect} from "vue";
import {getAll} from "@/services/brandnameService";
import {IdModal} from "@/enums/IdModal";

const brandnames = ref<IBrandname[]>([]);
const brandname = reactive<IBrandname>({
  code: "",
  createAt: "",
  expirationAt: "",
  id: 0,
  isDelete: false,
  name: "",
  projectCode: "",
  status: 0,
  type: "",
  updateAt: ""
})
const handleClickCreate = () => {
  brandname.code = "";
  brandname.expirationAt = "";
  brandname.name = "";
  brandname.projectCode = "";
  brandname.status = 0;
  brandname.type = "";
}
const page = ref<number>(0);
const size = ref<number>(20);
const fetchData = async () => {
  const res = await getAll(page.value, size.value);
  brandnames.value = res.data.data.content;
}
watchEffect( () => {
  fetchData()
});
</script>

<template>
  <div class="container-fluid">
    <div class="card border-0 mb-2 px-3">
      <ul class="nav mt-3 d-flex">
        <li class="nav-item d-flex col-4">
          <h4 class="page-title">Brandname</h4>
          <button id="create-btn" type="button" @click="() => handleClickCreate()" data-bs-toggle="modal" :data-bs-target="'#'+IdModal.create" class="btn-nav-link"><i class="fa-solid fa-plus mx-1"></i>Thêm
            mới
          </button>
          <ModalCreate :brandname="brandname" :fetchData="fetchData"/>
        </li>
      </ul>
    </div>
    <div>
      <Table :brandnames="brandnames"/>
    </div>
  </div>
</template>