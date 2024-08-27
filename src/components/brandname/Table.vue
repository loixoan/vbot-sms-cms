<script setup lang="ts">
import {computed, onMounted, reactive, ref, watchEffect} from "vue";
import {formatDate} from "@/helpers/functions";
import ModalUpdate from "@/components/brandname/ModalUpdate.vue";

const props = defineProps<{
  brandnames: IBrandname[]
}>()
const dataEdit =ref<IBrandname>();

</script>
<template>
  <div class="card-body p-0 table-responsive">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Mã brandname</th>
        <th scope="col">Tên brandname</th>
        <th scope="col">Mã project</th>
        <th scope="col">Loại</th>
        <th scope="col">Trạng thái</th>
        <th scope="col">Ngày hết hạn</th>
        <th scope="col">Ngày tạo</th>
        <th scope="col" class="text-end">Hành động</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="brandnames?.length > 0" v-for="brandname in brandnames">
        <td>{{brandname.id}}</td>
        <td>{{ brandname.code }}</td>
        <td>{{ brandname.name }}</td>
        <td>{{ brandname.projectCode }}</td>
        <td>{{ brandname.type }}</td>
        <td>{{ brandname.status && brandname.status == 0 ? 'Hoạt động' : 'Tạm dừng' }}</td>
        <td>{{ formatDate(brandname.expirationAt) }}</td>
        <td>{{ formatDate(brandname.createAt) }}</td>
        <td class="text-end" data-bs-toggle="modal" data-bs-target="#modal-update" @click="() => dataEdit = brandname">
          <button href="#" class="tb-action-item">
            <i class="fs-7 fas fa-pen mx-1"></i>Sửa
          </button>
          <button href="#" class="tb-action-item">
            <i class="fs-7 fas fa-trash mx-1"></i>Xóa
          </button>
        </td>
      </tr>
      </tbody>
    </table>
<!--    <nav v-if="brandnames?.totalPages > 1">-->
<!--      <ul class="pagination float-end paginations">-->
<!--      </ul>-->
<!--    </nav>-->
  </div>
  <ModalUpdate :dataEdit="dataEdit"/>

</template>

<style scoped>

</style>