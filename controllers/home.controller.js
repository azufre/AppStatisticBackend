

const home = async (req, resp = response) => {

    try {

        resp.json({
            data:'app is running...'
        });

    } catch (error) {

        resp.status(500).json({
            ok: false,
            msg: "Oops! Something went wrong."
        });

    }

};

module.exports = {
    home
}