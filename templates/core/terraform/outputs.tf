output "core_resource_group_name" {
  value = azurerm_resource_group.core.name
}

output "log_analytics_name" {
  value = module.azure_monitor.log_analytics_workspace_name
}

output "azure_tre_fqdn" {
  value = module.appgateway.app_gateway_fqdn
}

output "app_gateway_name" {
  value = module.appgateway.app_gateway_name
}

output "static_web_storage" {
  value = module.appgateway.static_web_storage
}

output "keyvault_name" {
  value = module.keyvault.keyvault_name
}

output "service_bus_resource_id" {
  value = module.servicebus.id
}

output "state_store_resource_id" {
  value = module.state-store.id
}

output "state_store_endpoint" {
  value = module.state-store.endpoint
}

output "state_store_account_name" {
  value = module.state-store.cosmosdb_account_name
}
