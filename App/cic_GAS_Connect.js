function AppendDataStringVar(dataString, varName, varValue)
{
    return `${dataString}&${varName}=${varValue}`;
}

function GoogleAppsScriptGet(appsScriptID, rpcID, dataString, responseCallback, callbackTempDataHolder=null)
{
    const url = `https://script.google.com/macros/s/${appsScriptID}/exec?rpcID=${rpcID}${dataString}`;
    fetch(url,{method:'Get'})
    .then(response => response.json())
    .then(responseJson => 
    {
        responseJson.url = url;
        if(callbackTempDataHolder)
            responseJson.response.tempDataHolder = callbackTempDataHolder;
        responseCallback(responseJson);
    })
    .catch(error => 
    {
        error.status = 'Failed Get';
        error.url = url;
        error.method = 'Get';
        error.rpcID = rpcID;
        error.dataString = dataString;
        console.log('Error in fetch(): ', error);
    });
}

function GoogleAppsScriptPost(appsScriptID, rpcID, formData, responseCallback, callbackTempDataHolder=null)
{
    const url = `https://script.google.com/macros/s/${appsScriptID}/exec`;
    formData.append("rpcID",rpcID);
    fetch(url,
    {
        method:'Post',
        body:formData,
        //mode: 'no-cors'
    })
    .then(response => response.json())
    .then(responseJson => 
    {
        responseJson.url = url;
        if(callbackTempDataHolder)
            responseJson.response.tempDataHolder = callbackTempDataHolder;
        responseCallback(responseJson);
    })
    .catch(error => 
    {
        error.status = 'Failed Post';
        error.url = url;
        error.method = 'Post';
        error.rpcID = rpcID;
        error.formData = [...formData.entries()];
        console.log('Error in fetch(): ', error);
    });
}

function GoogleSheetQueryTableSQL(spreadsheetID, sheetName, querySQL, responseCallback, callbackTempDataHolder=null)
{
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetID}/gviz/tq?&sheet=${sheetName}&tq=${encodeURIComponent(querySQL)}`;
    fetch(url)
    .then(response => response.text())
    .then(responseText => 
    {
        //console.log(`GoogleSheetQueryTableSQL(spreadsheetID:${spreadsheetID}, sheetName:${sheetName}, querySQL:${querySQL}, responseCallback(callbackTempDataHolder:${callbackTempDataHolder})`);
        //console.log('responseText=>',responseText);
        const cutString = responseText.split('setResponse(');
        const sheetJsonObjs = JSON.parse(cutString[1].slice(0,-2));
        const jsTable = JsonSheetObjectsToJsTableObject(sheetJsonObjs, sheetName);
        if(callbackTempDataHolder)
            responseCallback({status: 'Ok', response:{msg:'Query successful!', data:jsTable, tempDataHolder:callbackTempDataHolder}, request:{url:url, spreadSheetID:spreadsheetID, sheetName:sheetName, querySQL:querySQL, responseCallback:responseCallback}});
        else
            responseCallback({status: 'Ok', response:{msg:'Query successful!', data:jsTable}, request:{url:url, spreadSheetID:spreadsheetID, sheetName:sheetName, querySQL:querySQL, responseCallback:responseCallback}});
    })
    .catch(error => 
    {
        error.status = 'Failed Query';
        error.url = url;
        error.sheetTableName = sheetName;
        error.querySQL = querySQL;
        console.log('sqlqueryerror',error);
    });
}

function JsonSheetObjectsToJsTableObject(sheetJsonObjs, sheetName)
{
    const dataTable = {};
    const cols = [];
    const rows = [];
    let rowIndex,colIndex;

    //const parsedHeaders = sheetJsonObjs.table.parsedNumHeaders>0;
    const parsedHeaders = sheetJsonObjs.table.parsedNumHeaders>0 || (sheetJsonObjs.table.cols && sheetJsonObjs.table.cols.length>0 && sheetJsonObjs.table.cols[0].label!=null && sheetJsonObjs.table.cols[0].label!='');
    if(parsedHeaders)
    {
        for(colIndex=0; colIndex<sheetJsonObjs.table.cols.length; colIndex++)
        {
            if(sheetJsonObjs.table.cols[colIndex].label)
                cols.push(sheetJsonObjs.table.cols[colIndex].label);//.toLowerCase().replace(/\s/g,'');
        }
    }
    for(rowIndex=0; rowIndex<sheetJsonObjs.table.rows.length; rowIndex++)
    {
        if(!parsedHeaders && rowIndex==0)
        {
            for(colIndex=0; colIndex<sheetJsonObjs.table.rows[0].c.length; colIndex++)
            {
                if(sheetJsonObjs.table.rows[0].c[colIndex].v)
                    cols.push(sheetJsonObjs.table.rows[0].c[colIndex].v);//.toLowerCase().replace(/\s/g,'');   
            }
        }
        else
        {
            const newRow = {};
            for(colIndex=0; colIndex<cols.length; colIndex++)
            {
                newRow[cols[colIndex]] = (sheetJsonObjs.table.rows[rowIndex].c[colIndex]!=null)?sheetJsonObjs.table.rows[rowIndex].c[colIndex].v:'';
            }
            rows.push(newRow);
        }
    }
    dataTable.label = sheetName;
    dataTable.cols = cols;
    dataTable.rows = rows;
    return dataTable;
}

function RowTableObjFromTableObject(dataTable, rowIndex)
{
    if(!dataTable || dataTable.rows.length<=rowIndex)
        return null;
    const dataRow = {};
    const colHeaders = [];
    const rowContent = {};
    for(let colIndex=0; colIndex<dataTable.cols.length; colIndex++)
    {
        colHeaders.push(dataTable.cols[colIndex]);
        rowContent[dataTable.cols[colIndex]] = dataTable.rows[rowIndex][dataTable.cols[colIndex]];
    }
    dataRow.label = dataTable.label;
    dataRow.cols = colHeaders;
    dataRow.row = rowContent;
    return dataRow;
}

function TableObjectToArrays(dataTable)
{
    const TableArray = [];
    for(let rowIndex=0; rowIndex<dataTable.rows.length; rowIndex++)
    {
        const RowArray = [];
        for(let colIndex=0; colIndex<dataTable.cols.length; colIndex++)
        {
            RowArray.push(dataTable.rows[rowIndex][dataTable.cols[colIndex]]);
        }
        TableArray.push(RowArray);
    }
    return TableArray;
}