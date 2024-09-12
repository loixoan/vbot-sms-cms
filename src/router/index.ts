import {createRouter, createWebHistory} from 'vue-router'
import Dashboard from "@/views/DashboardView.vue";
import BrandnamePrice from "@/components/brandnamePrice/BrandnamePrice.vue";
import Brandname from "@/components/brandname/Brandname.vue";
import Template from "@/components/template/Template.vue";
import CampaignGroup from "@/components/campaignGroup/CampaignGroup.vue";
import CampaignPhone from "@/components/campaignPhone/CampaignPhone.vue";
import Campaign from "@/components/campaign/Campaign.vue";
import CustomField from "@/components/customField/CustomField.vue";
import Queue from "@/components/queue/Queue.vue";
import History from "@/components/history/History.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/brandname',
            name: 'brandname',
            component: Brandname
        },
        {
            path: '/brandname-price',
            name: 'brandnamePrice',
            component: BrandnamePrice
        },
        {
            path: '/template',
            name: 'template',
            component: Template
        },
        {
            path: '/campaign-group',
            name: 'campaignGroup',
            component: CampaignGroup
        },
        {
            path: '/campaign-phone',
            name: 'campaignPhone',
            component: CampaignPhone
        },
        {
            path: '/campaign',
            name: 'campaign',
            component: Campaign
        },
        {
            path: '/field',
            name: 'field',
            component: CustomField
        },
        {
            path: '/queue',
            name: 'queue',
            component: Queue
        },
        {
            path: '/history',
            name: 'history',
            component: History
        }
        // {
        //     path: '/test',
        //     name: 'test',
        //     component: Test
        // }
    ]
})

export default router
