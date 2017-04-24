---
layout: post
title: Fine Art, See?
---
For our React project, my team made an app that allows the user to curate her own museum exhibition. We decided to work with the Harvard Art Museums API because their collection comprises over 200,000 objects and 91% of those items have at least one image. However, whether the image url is publicly available is limited by rights restrictions, especially for modern and contemporary works still under copyright.

The [experimental endpoint](https://github.com/harvardartmuseums/api-docs/blob/master/experimental.md) contains some interesting data, but does not cover all objects in the collection.

>The data is a result of machine processing data and images through external services including [Google Vision](https://cloud.google.com/vision/), [Microsoft Cognitive Services](https://www.microsoft.com/cognitive-services), [Imagga](https://imagga.com/), and [Clarifai](https://clarifai.com/). We are using the services to perform face detection, text detection, color analysis, and automatic feature detection/tagging of images. We have not created training sets for these services. We are feeding in our images and data as-is to see what comes out.

I found this image that is clearly a dog wearing a hat, shirt, and pants.

![dog dressed as Donald Duck](http://ids.lib.harvard.edu/ids/view/42949180?width=3000&height=3000)
*[Untitled (poodle wearing pants, shirt, and suspenders)](http://www.harvardartmuseums.org/collections/object/127188) courtesy Harvard Art Museums*

However, the response shows that the Microsoft service suggested `captions: [{text: "a man sitting in the snow", confidence: 0.11904114499362317}]` and Imagga analyzed the image as
```json
categories: [
{
name: "events parties",
confidence: 79.74
},
{
name: "pets animals",
confidence: 6.55
},
{
name: "text visuals",
confidence: 3.57
},
{
name: "people portraits",
confidence: 2.57
},
{
name: "paintings art",
confidence: 2.21
},
{
name: "food drinks",
confidence: 1.9
},
{
name: "streetview architecture",
confidence: 1.54
},
{
name: "nature landscape",
confidence: 1.01
},
{
name: "interior objects",
confidence: 0.83
}
]
```
LOL! We found that Google Vision can be used to analyze a photograph for emotions, e.g. `surpriseLikelihood: "VERY_UNLIKELY"`, and hats `headwearLikelihood: "VERY_LIKELY"`, and can also determine the coordinates of facial features. There are a lot of attributes in the experimental endpoint that would be fun to play with, but for this project we decided to go with the [object endpoint](https://github.com/harvardartmuseums/api-docs/blob/master/object.md) to return more reliable results based on user-generated keywords. Along with the standard catalogue descriptors, it has fields for provenance, accession year, and total page views that may yield some surprises.

I like to search the collection with mundane words like dog and pink. My two favorite images so far are:

![white dog biting brown dog](http://nrs.harvard.edu/urn-3:HUAM:INV156245_dynmc?width=3000&height=3000)
*[Untitled (white dog biting brown dog)](http://www.harvardartmuseums.org/art/158697) courtesy Harvard Art Museums*

![bulldog in pink bathroom](http://nrs.harvard.edu/urn-3:HUAM:INV156243_dynmc?width=3000&height=3000)
*[Untitled (bulldog in pink bathroom)](http://www.harvardartmuseums.org/collections/object/158716) courtesy Harvard Art Museums*

Aren't they just terrific? It turns out both photos are by Ann E. Wulff from her series *Caged Tigers* published in the early 80s. I love them so much.
