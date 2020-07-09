# Notification message
## FlashMesssageAutoHideComponent
Show the message and it will be hidden automatically in 5 seconds

File location
```
components/flash-messsage-auto-hide/flash-messsage-auto-hide.component.ts
```

### How to use
```
<flash-messsage-auto-hide [options]="messageOptions"></flash-messsage-auto-hide>
```

```
# in page
this.messageOptions = {
  type: 'success',
  message: 'SUSPEND_COMPANIES'
}
```
Notice: The flash message will be shown immediately after the messageOptions is set or re-set

# Datatable
## Filter pipe (filerConditions)

File location
```
pipes/filter-conditions.pipe.ts
```

### How to use
```
<input [(ngModel)]="filterOptions.keyword" name="keyword" />
```

```
### pipe options syntax
# filerConditions:[ngModel]:[array_of_filter_for_columns]:{Hash optional}

<ngx-datatable
[rows]="rows | filerConditions:filterOptions.keyword:'name':{isContain: true}
             | filerConditions:filterOptions.country:'country_code'">
</ngx-datatable>
```

## Page limit selection (DatatablePageLimitComponent)

File location
```
components/datatable-page-limit/datatable-page-limit.component.ts
```

### How to use
```
<datatable-page-limit [(limit)]="pageLimit"></datatable-page-limit>

<ngx-datatable [limit]="pageLimit"> ... <ngx-datatable>
```

# Importing
## DataImportingComponent

File location
```
modules/dashboard/data-importing/data-importing.component.ts
```

### How to use
For importing feature, nearly you won't need to write front-end, just call the component, pass IMPORT_TYPE and handle the logic in backend
```
<app-data-importing importType="[IMPORT_TYPE]">
  [CUSTOM HTML FOR THIS COMPONENT]
</app-data-importing>
```
