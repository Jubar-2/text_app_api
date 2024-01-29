import { createHmac } from 'crypto';
const utilise = {};

utilise.hash = (str) => {
    if (typeof str === 'string') {
        const hash = createHmac('sha256', "Jubaer Rahman")
            .update(str)
            .digest('hex');

        return hash;
    }
};

export default utilise;