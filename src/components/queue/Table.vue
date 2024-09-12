<script setup lang="ts">
import {nextTick, reactive, ref, watch} from "vue";
import {formatCurrency, formatDate, paramUrl} from "@/helpers/functions";
import {IdModal} from "@/enums/IdModal";
import {Status} from '@/enums/Status';
import router from "@/router";
import {CampaignStatus} from "@/enums/CampaignStatus";

const props = defineProps<{
  queues: IQueue[],
  page: number,
  size: number,
  countAll: number
}>()
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
        <th scope="col">Tên SĐT</th>
        <th scope="col">SĐT</th>
        <th scope="col">Brandname</th>
        <th scope="col">Tên Template</th>
        <th scope="col">Nội dung</th>
        <th scope="col">Cước</th>
        <th scope="col">Trạng thái</th>
        <th scope="col">Ngày tạo</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="queues?.length > 0" v-for="queue in queues">
        <td>{{ queue.id }}</td>
        <td>{{ queue.name }}</td>
        <td>{{ queue.phone }}</td>
        <td>{{ queue.brandname }}</td>
        <td>{{ queue.tempName }}</td>
        <td>{{ queue.content }}</td>
        <td>{{ formatCurrency(queue.postage) }}</td>
        <td><span :class="CampaignStatus[queue.status].color">{{ CampaignStatus[queue.status].message }}</span></td>
        <td>{{ formatDate(queue.createAt) }}</td>
      </tr>
      <tr v-else>
        <td colspan="9" class="text-center">Hiện không có dữ liệu nào!</td>
      </tr>
      </tbody>

    </table>
    <ul v-if="countAll > size" class="pagination float-end data-pagination">
    </ul>
  </div>

</template>