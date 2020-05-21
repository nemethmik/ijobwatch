export type TProductionOrder = {
  "jobNumber": string,
  "statusCode": string,
  "errorCode": string,
  "errorText": string,
  "errorStackTrace": string,
  "found": string,
  "id": string,
  "execMillis": number,
  "bo": {
      [key:string]:any,
      "BOM": {
          "BO": {
              "AdmInfo": {
                  "Object": string
              },
              "OWOR": {
                  "row": {
                    [key:string]:any,
                    "DocEntry": string,
                      "DocNum": string,
                      "Series": string,
                      "ItemCode": string,
                      "Status": string,
                      "Type": string,
                      "PlannedQty": string,
                      "CmpltQty": string,
                      "RjctQty": string,
                      "PostDate": string,
                      "DueDate": string,
                      "UserSign": string,
                      "Comments": {
                          "@nil": "true"
                      },
                      "CloseDate": {
                          "@nil": "true"
                      },
                      "RlsDate": string,
                      "CardCode": {
                          "@nil": "true"
                      },
                      "Warehouse": string,
                      "Uom": {
                          "@nil": "true"
                      },
                      "JrnlMemo": string,
                      "CreateDate": string,
                      "Printed": string,
                      "LogInstanc": "0",
                      "UserSign2": "8",
                      "UpdateDate": "20200512",
                      "Project": {
                          "@nil": "true"
                      },
                      "SupplCode": {
                          "@nil": "true"
                      },
                      "UomEntry": "-1",
                      "PickRmrk": {
                          "@nil": "true"
                      },
                      "SysCloseDt": {
                          "@nil": "true"
                      },
                      "SysCloseTm": {
                          "@nil": "true",
                          "#text": "0"
                      },
                      "CloseVerNm": {
                          "@nil": "true"
                      },
                      "StartDate": string,
                      "ObjType": string,
                      "ProdName": string,
                      "Priority": string,
                  }
              },
              "WOR1": {
                  "row": [
                      {
                        [key:string]:any,
                        "DocEntry": string,
                          "LineNum": string,
                          "ItemCode": string,
                          "BaseQty": string,
                          "PlannedQty": string,
                          "IssuedQty": string,
                          "IssueType": string,
                          "wareHouse": string,
                          "VisOrder": string,
                          "CompTotal": string,
                          "ItemType": string,
                          "AdditQty": string,
                          "LineText": {
                              "@nil": "true"
                          },
                          "ReleaseQty": "0.000000",
                          "ResAlloc": {
                              "@nil": "true"
                          },
                          "StartDate": string,
                          "EndDate": string,
                          "StageId": string,
                          "BaseQtyNum": string,
                          "BaseQtyDen": string,
                          "ReqDays": string,
                          "RtCalcProp": string,
                          "Status": string,
                          "ItemName": string,
                          "U_CompletedQty": string,
                          "U_ReworkQty": string,
                          "U_RejectedQty": string
                      },
                  ]
              },
              "WOR4": {
                  "row": [
                      {
                          "DocEntry": string,
                          "StageId": string,
                          "SeqNum": string,
                          "StgEntry": string,
                          "Name": string,
                          "LogInstanc": string,
                          "StartDate": string,
                          "EndDate": string,
                          "Status": string,
                          "RtCalcProp": string,
                          "ReqDays": string,
                          "WaitDays": string
                      },
                  ]
              }
          }
      }
  },
  "rawXml": string,
  "xmlSchema": string,
  "connection": {
      "Profile": string,
      "CompanyDB": string,
      "Server": string,
      "DbUserName": string,
      "UserName": string,
      "DbServerType": string,
      "AdoNetUser": string
  },
  "reqType": string,
  "boName": string
}