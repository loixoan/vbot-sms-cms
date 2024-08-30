<script setup lang="ts">
import {nextTick, reactive, ref, watch} from "vue";
import {paramUrl} from "@/helpers/functions";
import ModalUpdate from "@/components/brandnamePrice/ModalUpdate.vue";
import {IdModal} from "@/enums/IdModal";
import router from "@/router";
import ModalDelete from "@/components/brandnamePrice/ModalDelete.vue";

const props = defineProps<{
  brandnames : IBrandname[]
  brandnamePrices: IBrandnamePrice[],
  page: number,
  size: number,
  countAll: number
}>()
const dataEdit = reactive<IBrandnamePrice>({
  brandName: "", brandNameId: 0, id: 0, price: 0, telcoCode: ""

});
const idDelete = ref<number>(0);
const handleClickEdit = (brandnamePrice: IBrandnamePrice) => {
  dataEdit.id = brandnamePrice.id;
  dataEdit.brandNameId = brandnamePrice.brandNameId;
  dataEdit.price = brandnamePrice.price;
  dataEdit.telcoCode = brandnamePrice.telcoCode;
}
const initializePagination = () => {
  if ($("ul").hasClass("data-pagination")) {
    $('.data-pagination').pagination({
      dataSource: [...Array(props.countAll).keys()],
      pageNumber: props.page + 1,
      pageSize: props.size,
      callback: (data: any, pageObj: any) => {
        if (pageObj.pageNumber !== props.page + 1) {
          router.push({
            query: {
              ...paramUrl(),
              page: pageObj.pageNumber - 1,
              size: props.size
            }
          });
        }
      }
    });
  }
};
watch([() => props.page, () => props.size, () => props.countAll], () => {
    nextTick(() => initializePagination())
},{immediate:true});


</script>
<template>
  <div class="card-body p-0 table-responsive">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Brandname</th>
        <th scope="col">Giá</th>
        <th scope="col">Mã Telco</th>
        <th scope="col" class="text-end">Hành động</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="brandnamePrices?.length > 0" v-for="brandname in brandnamePrices">
        <td>{{ brandname.id }}</td>
        <td>{{ brandname.brandName }}</td>
        <td>{{ brandname.price }}</td>
        <td>{{ brandname.telcoCode }}</td>
        <td class="text-end">
          <button href="#" class="tb-action-item" data-bs-toggle="modal" :data-bs-target="`#${IdModal.update}`"
                  @click="() => handleClickEdit(brandname)">
            <i class="fs-7 fas fa-pen mx-1"></i>Sửa
          </button>
          <button href="#" class="tb-action-item" data-bs-toggle="modal" :data-bs-target="`#${IdModal.delete}`"
                  @click="()=> idDelete = brandname.id">
            <i class="fs-7 fas fa-trash mx-1"></i>Xóa
          </button>
        </td>
      </tr>
      <tr v-else>
        <td colspan="9" class="text-center">Hiện không có dữ liệu nào!</td>
      </tr>
      </tbody>
    </table>
      <ul v-if="countAll > size" class="pagination float-end data-pagination">
      </ul>
  </div>
  <ModalUpdate :brandnames="brandnames" :brandnamePrice="dataEdit"/>
  <ModalDelete :id="idDelete"/>

</template>

<style scoped>

</style>