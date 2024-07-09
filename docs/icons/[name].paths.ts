import iconsJson from "../../icons/icons-tree.json"; // FIX: path to icons

export default {
  paths() {
    let flatIcons: any[] = [];

    for (const key in iconsJson) {
      if (Object.prototype.hasOwnProperty.call(iconsJson, key)) {
        const category = iconsJson[key];

        for (const key in category) {
          if (Object.prototype.hasOwnProperty.call(category, key)) {
            const icons = category[key];
            flatIcons = [...flatIcons, ...icons];
          }
        }
      }
    }

    const paths = flatIcons.map((icon) => ({
      params: {
        name: icon.name,
        isFree: icon.isFree,
      }
    }));

    return paths;
  }
}
