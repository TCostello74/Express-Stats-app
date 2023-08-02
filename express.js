const express = require('express');
const app = express();

// Calculation functions
function mean(nums) {
    return nums.reduce((acc, cur) => acc + cur, 0) / nums.length;
}

function median(nums) {
    nums.sort((a, b) => a - b);
    const mid = Math.floor(nums.length / 2);
    return nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

function mode(nums) {
    const freq = nums.reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1;
        return acc;
    }, {});
    let mode = [];
    let maxFreq = 0;
    for (const num in freq) {
        if (freq[num] > maxFreq) {
            maxFreq = freq[num];
            mode = [+num];
        } else if (freq[num] === maxFreq) {
            mode.push(+num);
        }
    }
    return mode;
}

// Routes
app.get('/mean', function (req, res) {
    const nums = req.query.nums.split(',').map(Number);
    if (nums.includes(NaN)) {
        const invalidNum = req.query.nums.split(',')[nums.indexOf(NaN)];
        res.status(400).json({ error: `${invalidNum} is not a number.` });
    } else {
        const value = mean(nums);
        res.json({ operation: 'mean', value });
    }
});

app.get('/median', function (req, res) {
    const nums = req.query.nums.split(',').map(Number);
    if (nums.includes(NaN)) {
        const invalidNum = req.query.nums.split(',')[nums.indexOf(NaN)];
        res.status(400).json({ error: `${invalidNum} is not a number.` });
    } else {
        const value = median(nums);
        res.json({ operation: 'median', value });
    }
});

app.get('/mode', function (req, res) {
    const nums = req.query.nums.split(',').map(Number);
    if (nums.includes(NaN)) {
        const invalidNum = req.query.nums.split(',')[nums.indexOf(NaN)];
        res.status(400).json({ error: `${invalidNum} is not a number.` });
    } else {
        const value = mode(nums);
        res.json({ operation: 'mode', value });
    }
});

app.listen(3000, function () {
    console.log('App listening on port 3000');
});

module.exports = app;
