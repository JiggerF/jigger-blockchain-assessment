const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


// Deployments are defined through ignition modules, specify what contract to deploy
const GetterSetterModule = buildModule("GetterSetterModule", (m) => {
  const getterSetter = m.contract("GetterSetter");

  return { getterSetter };
});

module.exports = GetterSetterModule;