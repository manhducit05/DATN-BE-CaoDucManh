// Gom 12 máy thành 3 nhóm, mỗi nhóm có maxTime là 5
const groupMaxTimes = [5, 5, 5]; // mỗi nhóm sẽ gán cho 4 máy

function generateGroupedParameterSets(maxTimes) {
    const result = [];

    const helper = (current, index) => {
        if (index === maxTimes.length) {
            result.push([...current]);
            return;
        }

        for (let i = 1; i <= maxTimes[index]; i++) {
            current.push(i);
            helper(current, index + 1);
            current.pop();
        }
    };

    helper([], 0);
    return result;
}

// Mở rộng bộ thông số thành 12 máy (4 máy mỗi nhóm)
function expandToFullMachineSet(groupedParamSet) {
    const expanded = [];
    for (let value of groupedParamSet) {
        for (let i = 0; i < 4; i++) {
            expanded.push(value);
        }
    }
    return expanded;
}

// Sinh danh sách tổ hợp cho 3 nhóm
const groupedSets = generateGroupedParameterSets(groupMaxTimes);

// Biến đổi thành bộ 12 máy
const fullParameterSets = groupedSets.map(expandToFullMachineSet);

// Export hàm dùng trong controller
let currentIndex = 0;
let lastAccessTime = 0;

const getNextParameterSet = (req, res) => {
    const now = Date.now();

    if (now - lastAccessTime < 500) {
        return res.status(429).json({
            message: "⏳ Simulation chưa chạy xong. Vui lòng đợi đủ 50s.",
        });
    }

    // if (currentIndex >= fullParameterSets.length) {
    //     return res.status(200).json({
    //         message: "✅ Đã duyệt hết tất cả các bộ thông số.",
    //         done: true,
    //     });
    // }

    const param = fullParameterSets[currentIndex];
    currentIndex++;
    lastAccessTime = now;

    // Trả về đúng dạng JSON array, không phải string
    return res.json(param);
};

module.exports = { getNextParameterSet };
