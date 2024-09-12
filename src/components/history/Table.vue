<script setup lang="ts">
import {nextTick, reactive, ref, watch} from "vue";
import {formatCurrency, formatDate, paramUrl} from "@/helpers/functions";
import router from "@/router";
import {CampaignStatus} from "@/enums/CampaignStatus";

const props = defineProps<{
  histories: IHistory[],
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
        <th scope="col">BrandName</th>
        <th scope="col">Loại BrandName</th>
        <th scope="col">Chiến dịch</th>
        <th scope="col">Template</th>
        <th scope="col">Nguồn</th>
        <th scope="col">Sđt</th>
        <th scope="col">Cước</th>
        <th scope="col">Id sms</th>
        <th scope="col">Độ dài sms</th>
        <th scope="col">Trạng thái</th>
        <th scope="col">Nội dung</th>
        <th scope="col">Ngày tạo</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="histories?.length > 0" v-for="history in histories">
        <td>{{ history.brandName }}</td>
        <td>{{ history.brandNameType }}</td>
        <td>{{ history.campName }}</td>
        <td>{{ history.tempName }}</td>
        <td>{{ history.src }}</td>
        <td>{{ history.dest }}</td>
        <td>{{ formatCurrency(history.postage) }}</td>
        <td>{{ history.smsId }}</td>
        <td>{{ history.smsLength }}</td>
        <td><span :class="CampaignStatus[history.status].color">{{ CampaignStatus[history.status].message }}</span></td>
        <td>{{ history.content }}</td>
        <td>{{ formatDate(history.createAt) }}</td>
      </tr>
      <tr v-else>
        <td colspan="13" class="text-center">Hiện không có dữ liệu nào!</td>
      </tr>
      </tbody>

    </table>
    <ul v-if="countAll > size" class="pagination float-end data-pagination">
    </ul>
  </div>

</template>