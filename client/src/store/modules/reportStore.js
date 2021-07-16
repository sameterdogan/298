import axios from 'axios'
/*import {router} from "../../router"*/


const reportStore = {
    state: {
        reports: [],
        report:{},
        publicReports:[],
        reportsBySubCategoryId:[],
        selectCategory:null,
        publicReportQueryProps:{
            filter: {
                title:""
            },
            pagination: { page: 1, limit: 3, isEndIndex: false },
        },
        publicReportPaginationCardInfo:{
        }
    },
    mutations: {
        INIT_REPORTS(state,reports) {
            state.reports = reports
        },
        INIT_PUBLIC_REPORTS(state,publicReports){
              state.publicReports=publicReports
        },
        INIT_REPORTS_BY_SUB_CATEGORY_ID(state,reportsBySubCategoryId){
            state.reportsBySubCategoryId=reportsBySubCategoryId
        },
        DELETE_REPORT(state,reportId) {
            const reportIndex=state.reports.findIndex(r=>r._id===reportId)
            if(reportIndex >=0){
                state.reports.splice(reportIndex,1)
            }
        },
        SELECT_CATEGORY(state,categoryInfo){
            state.selectCategory=categoryInfo
        },
        PUBLIC_REPORTS_CHANGE_SEARCH_TITLE(state, title) {
            state.publicReportQueryProps.filter["title"] = title
        },
        PUBIC_REPORTS_CHANGE_PAGINATION(state, page) {
            state.publicReportQueryProps.pagination.page = page
        },
        PUBIC_REPORTS_CHANGE_PAGINATION_CARD_INFO(state, paginationInfo) {
            state.publicReportPaginationCardInfo= paginationInfo
        },
        RESET_PUBLIC_REPORT_PAGINATION_CARD_INFO_ACTIVE_PAGE(state){
            state.publicReportPaginationCardInfo.activePage=1
        },
        INIT_REPORT(state,report){
            state.report=report
        }



    },
    actions: {
        initReports:async ({commit})=>{
            try{
                const res=await  axios.get("reports/all-reports")

                console.log(res.data.allReports)
                commit("INIT_REPORTS",res.data.allReports)

            }catch (err) {
                console.log(err.response)
            }


        },
        initReport:async ({commit},reportId)=>{
            try{
                console.log(reportId)
                const res=await  axios.get(`reports/${reportId}`)

                console.log(res)
                commit("INIT_REPORT",res.data.report)

            }catch (err) {
                console.log(err.response)
            }


        },

        initPublicReports:async  ({commit,state})=>{
            try{
                const filter = JSON.stringify(state.publicReportQueryProps.filter)
                const pagination = JSON.stringify(state.publicReportQueryProps.pagination)
                const res=await  axios.get(`reports/public-reports?filter=${filter}&paginationProps=${pagination}`)
                 console.log(res)
                console.log(res.data.publicReports)
                commit("INIT_PUBLIC_REPORTS",res.data.publicReports)
                commit("PUBIC_REPORTS_CHANGE_PAGINATION_CARD_INFO",res.data.paginationInfo)

            }catch (err) {
                console.log(err.response)
            }


        },
        initReportBySubCategoryId:async  ({commit,state},subCategoryId)=>{
            try{
                const filter = JSON.stringify(state.publicReportQueryProps.filter)
                const pagination = JSON.stringify(state.publicReportQueryProps.pagination)
                const res=await  axios.get(`reports/reports-by-sub-category/${subCategoryId}?filter=${filter}&paginationProps=${pagination}`)
                console.log(res)
                console.log(res.data.publicReports)
                commit("INIT_REPORTS_BY_SUB_CATEGORY_ID",res.data.reportsBySubCategory)
                commit("PUBIC_REPORTS_CHANGE_PAGINATION_CARD_INFO",res.data.paginationInfo)

            }catch (err) {
                console.log(err.response)
            }


        },
        newReport:async ({commit},newReportInfo)=>{
            try{
                const res=await  axios.post("reports/new-report",newReportInfo,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })


                console.log(res.data)
             /*   commit("NEW_REPORT",res.data.allReports)*/
/*              await  router.push("/")*/
                commit("INIT_MESSAGE",{message:res.data.message,color:"success"})
            }catch (err) {
                console.log(err.response)
                commit("INIT_MESSAGE",{message:err.response.data.message,color:"danger"})
            }
        },
        deleteReport:async ({commit},reportId)=>{
            try{
                const res=await  axios.delete(`reports/delete-report/${reportId}`)

                console.log(res.data)
                commit("DELETE_REPORT",reportId)
            }catch (err) {
                console.log(err.response)
            }


        },
        selectCategory:({commit},categoryInfo)=>{
            commit("SELECT_CATEGORY",categoryInfo)
        }
    },

    getters: {
        getReports:state=>state.reports,
        getReport:state=>state.report,
        getPublicReports:state=>state.publicReports,
        getPublicReportsPaginationCardInfo:state=>state.publicReportPaginationCardInfo,
        getActivePage:state=>state.publicReportPaginationCardInfo.activePage || 1,
        getSearch:(state)=>{
            console.log(state.publicReportQueryProps)
            return state.publicReportQueryProps.filter.title
        },
        getReportsBySubCategory:state=>state.reportsBySubCategoryId
    },
}

export default reportStore