const slugify = require('slugify')

const getSlug = async ({model, name, tries = 0, id=null}) => {

    let modifiedName = name;

    if (tries > 0) {
        modifiedName = name + " " + tries;
    }

    const slug = slugify(modifiedName, {lower: true});

    const isExists = await model.findOne({slug: slug, '_id': {$ne: id}});

    if (isExists) {
        return await getSlug({model, name,tries: ++tries, id});
    }
    return slug;
}

module.exports = getSlug;
