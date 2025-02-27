async function runBrowserTests() {
    const tests = {
        inputValidation: async () => {
            const m0Input = document.getElementById('m0-input');
            const testCases = [
                { value: '-100', expected: '0' },
                { value: 'abc', expected: '0' },
                { value: '1000000', expected: '1000000' }
            ];

            for (const test of testCases) {
                m0Input.value = test.value;
                m0Input.dispatchEvent(new Event('input'));
                await new Promise(r => setTimeout(r, 100));
                console.assert(
                    m0Input.value === test.expected,
                    `Input validation failed for ${test.value}`
                );
            }
        },

        themeSwitch: async () => {
            const themeToggle = document.getElementById('theme-toggle');
            const initialTheme = document.documentElement.getAttribute('data-bs-theme');
            
            themeToggle.click();
            await new Promise(r => setTimeout(r, 300));
            
            console.assert(
                document.documentElement.getAttribute('data-bs-theme') !== initialTheme,
                'Theme switch failed'
            );
        }
    };

    for (const [name, test] of Object.entries(tests)) {
        try {
            await test();
            console.log(`✅ ${name} passed`);
        } catch (error) {
            console.error(`❌ ${name} failed:`, error);
        }
    }
}
