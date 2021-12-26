/* https://github.com/baghban71/PlayCanvas_ObjectPool
Mohammad Reza Baghbani 26/december/2021
*/

var ObjectPool = pc.createScript('objectPool');
ObjectPool.attributes.add("tags", { type: "string" });

ObjectPool.prototype.initialize = function () {
    if (!this.isInit)
        this.init();

};
ObjectPool.prototype.init = function () {
    this.isInit = true;
    this.pooledObjects = [];

    const prefabsTags = this.tags.split(',');

    this.prefabs = [];
    prefabsTags.forEach(
        (item) => {
            this.pooledObjects.push([]);
            var asst = this.app.assets.findByTag(item);
            this.prefabs.push(asst[0]);
        }
    );
};
ObjectPool.prototype.getPooledObject = function (prefabTypeInt) {
    if (!this.isInit)
        this.init();
    for (var i = 0; i < this.pooledObjects[prefabTypeInt].length; i++) {

        if (!this.pooledObjects[prefabTypeInt][i].enabled) {
            this.pooledObjects[prefabTypeInt][i].enabled = true;
            return this.pooledObjects[prefabTypeInt][i];
        }

    }

    var templateAsset = this.app.assets.get(this.prefabs[prefabTypeInt]._id);
    var instance = templateAsset.resource.instantiate();
    this.app.root.addChild(instance);
    this.pooledObjects[prefabTypeInt].push(instance);
    return instance;
};

