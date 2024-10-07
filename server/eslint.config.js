import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        rules: {
            "camelcase": "error",
            "eqeqeq": "warn",
            "max-depth": "warn",
            "no-var": "error",
            "prefer-arrow-callback": "warn",
            "prefer-const": "error",
            "prefer-promise-reject-errors": "warn",
            "require-await": "error",
            "yoda": "warn",
            "semi": "error"
        }
    }
];