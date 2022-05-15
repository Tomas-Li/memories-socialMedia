import Tags from '../models/tags.js';

export const getTags = async (req, res) => {
  try {
    const tags = await Tags.find();

    console.log("TAGS FORM BACKEND", tags);

    res.status(200).json(tags)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//todo{this should be async but when using await before .save() I get an error...}
export const createTags = async (req, res) => {
  const tags = req.body.tags
  const newTags = []
  
  try {
    tags.map(tag => {
      if( !Tags.find({ "name": tag }) ){
        let newTag = new Tags({ "name": tag });
        newTags.push(newTag);
        newTag.save();
      }
    })
    res.status(201).json(newTags)
  } catch (error) {
    console.log({ message: error.message });
  }
}

export const deleteTags = async (req, res) => {
  console.log("todo{...}")
}