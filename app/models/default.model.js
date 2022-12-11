module.exports = mongoose => {
    const Thing = mongoose.model(
        'thing',
        mongoose.Schema(
            {
                name: String
            },
        )
    );

    return Thing;
};