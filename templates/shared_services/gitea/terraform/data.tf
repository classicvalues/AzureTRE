data "azurerm_log_analytics_workspace" "tre" {
  name                = "log-${var.tre_id}"
  resource_group_name = local.core_resource_group_name
}

data "azurerm_app_service_plan" "core" {
  name                = "plan-${var.tre_id}"
  resource_group_name = local.core_resource_group_name
}

data "azurerm_application_insights" "core" {
  name                = "appi-${var.tre_id}"
  resource_group_name = local.core_resource_group_name
}

data "azurerm_virtual_network" "core" {
  name                = local.core_vnet
  resource_group_name = local.core_resource_group_name
}

data "azurerm_subnet" "shared" {
  resource_group_name  = local.core_resource_group_name
  virtual_network_name = local.core_vnet
  name                 = "SharedSubnet"
}

data "azurerm_subnet" "web_app" {
  resource_group_name  = local.core_resource_group_name
  virtual_network_name = local.core_vnet
  name                 = "WebAppSubnet"
}

data "azurerm_firewall" "fw" {
  name                = "fw-${var.tre_id}"
  resource_group_name = local.core_resource_group_name
}

data "azurerm_private_dns_zone" "mysql" {
  name                = "privatelink.mysql.database.azure.com"
  resource_group_name = local.core_resource_group_name
}

data "azurerm_private_dns_zone" "azurewebsites" {
  name                = "privatelink.azurewebsites.net"
  resource_group_name = local.core_resource_group_name
}

data "azurerm_storage_account" "gitea" {
  name                = local.storage_account_name
  resource_group_name = local.core_resource_group_name
}

data "local_file" "version" {
  filename = "${path.module}/../version.txt"
}

data "azurerm_container_registry" "mgmt_acr" {
  name                = var.acr_name
  resource_group_name = var.mgmt_resource_group_name
}

data "azurerm_key_vault" "keyvault" {
  name                = local.keyvault_name
  resource_group_name = local.core_resource_group_name
}
